import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubmissionsService } from './submissions.service';
import { TopicPayload } from '@app/types';

@Controller()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

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
  }
}
