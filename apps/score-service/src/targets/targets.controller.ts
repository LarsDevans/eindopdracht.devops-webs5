import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { TargetsService } from './targets.service';

@Controller()
export class TargetsController {
  constructor(private readonly targetService: TargetsService) {}

  @MessagePattern('target.created')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, imageUrl, ownerUuid } = topicPayload.data;

    if (!uuid || !imageUrl) {
      return console.error('Incomplete payload:', topicPayload.data);
    }

    const result = await this.targetService.create({
      uuid,
      imageUrl,
      createdAt: new Date(topicPayload.timestamp),
      ownerUuid,
    });
    if (result.success) {
      console.log(result.reason);
    }
  }
}
