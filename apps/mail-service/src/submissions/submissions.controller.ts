import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubmissionsService } from './submissions.service';
import { TopicPayload } from '@app/types';
import { MailService } from '../mail.service';
import { UsersService } from '../users/users.service';

@Controller()
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @MessagePattern('submission.created')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, targetUuid, ownerUuid } = topicPayload.data;

    const result = await this.submissionsService.create({
      uuid,
      targetUuid,
      ownerUuid,
    });
    if (result.success) {
      console.log(result.reason);
    }

    const user = await this.usersService.findOne(ownerUuid);
    if (!user) {
      return console.error('Invalid user UUID:', ownerUuid);
    }

    this.mailService.dispatchSubmissionCreatedEmail(
      user.email,
      targetUuid,
      result.data.uuid,
    );
  }
}
