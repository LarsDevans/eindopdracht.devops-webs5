import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from '../mail.service';
import { UsersService } from '../users/users.service';

@Controller()
export class TargetsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @MessagePattern('target.created')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, ownerUuid } = topicPayload.data;
    const user = await this.usersService.findOne(ownerUuid);
    this.mailService.dispatchTargetCreatedEmail(user.email, uuid);
  }
}
