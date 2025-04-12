import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TargetsService } from './targets.service';

@Controller('targets')
export class TargetsController {
  constructor(private readonly targetsService: TargetsService) {}

  @MessagePattern('target.created')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid } = topicPayload.data;

    const result = await this.targetsService.create({ uuid });
    if (result.success) {
      console.log(result.reason);
    }
  }

  @MessagePattern('target.completed')
  async close(@Payload() topicPayload: TopicPayload) {
    const { targetUuid } = topicPayload.data;

    const result = await this.targetsService.close(targetUuid);
    if (result.success) {
      console.log(result.reason);
    }
  }
}
