import { Controller } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TopicPayload } from '@app/types';

@Controller()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @MessagePattern('submission.removed')
  async removeSubmission(@Payload() topicPayload: TopicPayload) {
    const { uuid } = topicPayload.data;
    if (!uuid) {
      return console.error('Incomplete payload:', topicPayload.data);
    }

    this.submissionsService.remove(uuid);

    console.log(`Submission with UUID ${uuid} removed.`);
  }
}
