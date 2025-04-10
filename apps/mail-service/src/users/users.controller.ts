import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('user.create')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, email } = topicPayload.data;

    if (!uuid || !email) {
      return console.error('Invalid payload received:', topicPayload);
    }

    await this.usersService.create({ uuid, email });
  }
}
