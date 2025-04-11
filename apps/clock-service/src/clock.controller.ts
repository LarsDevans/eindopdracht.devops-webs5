import { Controller, Inject } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { KAFKA_CLIENT_NAME, KafkaService } from '@app/kafka';
import { TopicPayload } from '@app/types';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
    const result = await this.clockService.create({
      targetUuid: uuid,
      durationHours,
    });
    console.log(result);
  }
}
