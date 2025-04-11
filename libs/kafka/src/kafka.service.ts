import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { KAFKA_CLIENT_NAME } from './kafka.constants';
import { TopicPayload } from '@app/types';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_CLIENT_NAME)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  emit(topic: string, payload: TopicPayload) {
    return this.kafkaClient.emit(topic, payload);
  }
}
