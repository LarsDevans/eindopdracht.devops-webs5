import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { ClockService } from './clock.service';

@ApiTags('Clock Controller')
@Controller()
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @MessagePattern('target.created')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, durationHours } = topicPayload.data;

    const nowUtc = new Date();
    const deadlineUtc = new Date(
      nowUtc.getTime() + durationHours * 3600 * 1000, // TODO: This can be a service/function itself. Low priority.
    );

    const result = await this.clockService.create({
      targetUuid: uuid,
      deadlineUtc: deadlineUtc,
    });
    if (result.success) {
      console.log(result.reason);
    }
  }
}
