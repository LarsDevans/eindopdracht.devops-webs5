import { KAFKA_CLIENT_NAME, KafkaService } from '@app/kafka';
import { TopicPayload } from '@app/types';
import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ClockService } from './clock.service';

@ApiBearerAuth()
@ApiTags('Clock Controller')
@Controller()
export class ClockController {
  constructor(
    private readonly clockService: ClockService,
    @Inject(KAFKA_CLIENT_NAME) private readonly kafkaService: KafkaService,
  ) {}

  @MessagePattern('target.created')
  async create(@Payload() topicPayload: TopicPayload) {
    const { uuid, durationHours } = topicPayload.data;

    const nowUtc = new Date();
    const deadlineUtc = new Date(
      nowUtc.getTime() + durationHours * 3600 * 1000,
    );

    const result = await this.clockService.create({
      targetUuid: uuid,
      deadlineUtc: deadlineUtc,
    });
    console.log(result);
  }
}
