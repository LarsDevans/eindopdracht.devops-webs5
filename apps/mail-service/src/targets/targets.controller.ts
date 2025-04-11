import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MailService } from '../mail.service';
import { UsersService } from '../users/users.service';
import { TargetsService } from './targets.service';

// TODO: There will be code repetition for validating and retrieving the user. Could be delegate.
@Controller()
export class TargetsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly targetService: TargetsService,
    private readonly mailService: MailService,
  ) {}

  @MessagePattern('target.created')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, ownerUuid } = topicPayload.data;

    if (!uuid || !ownerUuid) {
      return console.error('Incomplete payload:', topicPayload.data);
    }

    const user = await this.usersService.findOne(ownerUuid);
    if (!user) {
      return console.error('Invalid user UUID:', ownerUuid);
    }

    const result = await this.targetService.create({ uuid, ownerUuid });
    if (result.success) {
      console.log(result.reason);
    }

    this.mailService.dispatchTargetCreatedEmail(user.email, uuid);
  }

  @MessagePattern('target.completed')
  async complete(@Payload() topicPayload: TopicPayload) {
    const { targetUuid } = topicPayload.data;

    if (!targetUuid) {
      return console.error('Incomplete payload:', topicPayload.data);
    }

    const target = await this.targetService.findOne(targetUuid);
    if (!target) {
      return console.error('Invalid target UUID:', targetUuid);
    }

    const user = await this.usersService.findOne(target.ownerUuid);
    if (!user) {
      return console.error('Invalid user UUID:', target.ownerUuid);
    }

    this.mailService.dispatchTargetCompletedEmail(user.email, targetUuid);
  }
}
