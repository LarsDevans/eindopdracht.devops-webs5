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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { uuid } = createUserDto;

    const existingUser = await this.userRepository.findOneBy({ uuid });
    if (existingUser) {
      console.log(`User ${uuid} already exists.`);
      return existingUser;
    }

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    console.log(`User ${uuid} successfully created.`);
    return user;
  }
}
