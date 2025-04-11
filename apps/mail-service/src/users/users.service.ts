import { ActionResult } from '@app/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ActionResult> {
    const { uuid } = createUserDto;

    const existingUser = await this.userRepository.findOneBy({ uuid });
    if (existingUser) {
      console.warn(`User ${existingUser.uuid} already exists.`);
      return {
        success: false,
        reason: `User ${existingUser.uuid} already exists.`,
        data: existingUser,
      };
    }

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    console.log(`User ${user.uuid} successfully created.`);
    return {
      success: true,
      reason: `User ${user.uuid} successfully created.`,
      data: user,
    };
  }

  async findOne(uuid: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ uuid });
  }
}
