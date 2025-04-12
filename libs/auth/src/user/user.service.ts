import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findOneByIdAndEmail(
    id: string,
    email: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id, email },
    });
  }
}
