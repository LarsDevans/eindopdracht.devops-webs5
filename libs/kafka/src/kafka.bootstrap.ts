import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { KAFKA_BROKERS } from './kafka.constants';

export async function attachKafka(app: INestApplication, groupId: string) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: KAFKA_BROKERS },
      consumer: { groupId },
    },
  });

  await app.startAllMicroservices();
}
