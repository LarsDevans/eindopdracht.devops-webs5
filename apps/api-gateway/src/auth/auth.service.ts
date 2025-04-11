import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string }> {
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

      return { token };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error registering user:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
