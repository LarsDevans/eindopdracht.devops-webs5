import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KafkaService } from '@app/kafka';
import { TopicPayload } from '@app/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly kafkaService: KafkaService,
  ) {}

  async register(registerDto: UserDto): Promise<{ token: string }> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { email, password } = registerDto;

      const existingUser = await queryRunner.manager.findOne(User, {
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException({
          success: false,
          reason: 'Email is already in use.',
          data: existingUser,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = queryRunner.manager.create(User, {
        email,
        password: hashedPassword,
      });
      await queryRunner.manager.save(user);

      const payload = { sub: user.id, username: user.email };
      const token = await this.jwtService.signAsync(payload);

      await queryRunner.commitTransaction();

      const kafkaPayload: TopicPayload = {
        topic: 'user.created',
        timestamp: Date(),
        data: {
          uuid: user.id,
          email: user.email,
        },
      };
      this.kafkaService.emit('user.created', kafkaPayload);

      return { token };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error registering user:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDto: UserDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new ConflictException({
        success: false,
        reason: 'Invalid credentials.',
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException({
        success: false,
        reason: 'Invalid credentials.',
        data: null,
      });
    }

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
