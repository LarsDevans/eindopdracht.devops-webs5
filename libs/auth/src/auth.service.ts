import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user/user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { DataSource, QueryRunner } from 'typeorm';
import { KafkaService } from '@app/kafka';
import { TopicPayload } from '@app/types';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly kafkaService: KafkaService,
    private readonly userService: UserService,
  ) {}

  async register(registerDto: UserDto): Promise<{ token: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await this.startTransaction(queryRunner);

    try {
      const user = await this.createUser(registerDto, queryRunner);
      const token = await this.generateToken(user);
      await this.commitTransaction(queryRunner);
      this.emitUserCreatedEvent(user);
      return { token };
    } catch (error) {
      await this.rollbackTransaction(queryRunner);
      console.error('Error registering user:', error);
      throw new ConflictException({
        success: false,
        reason: 'Registration failed.',
        data: error.message,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDto: UserDto): Promise<{ token: string }> {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user);
    return { token };
  }

  private async startTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
  }

  private async commitTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
  }

  private async rollbackTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }

  private async createUser(
    registerDto: UserDto,
    queryRunner: QueryRunner,
  ): Promise<User> {
    const { email, password } = registerDto;

    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException({
        success: false,
        reason: 'Email is already in use.',
        data: existingUser.email,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = queryRunner.manager.create(User, {
      email,
      password: hashedPassword,
    });
    return queryRunner.manager.save(user);
  }

  private async validateUser({ email, password }: UserDto): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    const isInvalid = !user || !(await bcrypt.compare(password, user.password));
    if (isInvalid) {
      throw new ConflictException({
        success: false,
        reason: 'Invalid credentials.',
        data: null,
      });
    }

    return user;
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  private emitUserCreatedEvent(user: User): void {
    const kafkaPayload: TopicPayload = {
      topic: 'user.created',
      timestamp: new Date().toISOString(),
      data: {
        uuid: user.id,
        email: user.email,
      },
    };

    this.kafkaService.emit('user.created', kafkaPayload);
  }
}
