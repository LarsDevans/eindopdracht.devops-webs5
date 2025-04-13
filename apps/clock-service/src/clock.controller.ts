import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ClockService } from './clock.service';

@Controller()
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @MessagePattern('target.created')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, durationHours } = topicPayload.data;

    const deadlineUtc = this.calculateDeadlineTimeUtc(durationHours);
    const result = await this.clockService.create({
      targetUuid: uuid,
      deadlineUtc: deadlineUtc,
    });
    if (result.success) {
      console.log(result.reason);
    }
  }

  calculateDeadlineTimeUtc(durationHours: number): Date {
    const nowUtc = new Date();
    return new Date(nowUtc.getTime() + durationHours * 3600 * 1000);
  }
}
