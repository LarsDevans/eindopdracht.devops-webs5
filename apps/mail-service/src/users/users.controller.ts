import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MailService } from '../mail.service';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @MessagePattern('user.create')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, email } = topicPayload.data;

    if (!uuid || !email) {
      return console.error('Invalid payload received:', topicPayload);
    }

    const result = await this.usersService.create({ uuid, email });
    if (result.success) {
      this.mailService.dispatchWelcomeEmail(email);
    }
  }
}
