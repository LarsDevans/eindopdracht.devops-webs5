import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { KAFKA_BROKERS, KAFKA_CLIENT_NAME } from './kafka.constants';
import { KafkaSharedOptions } from './kafka.interfaces';
import { KafkaProducerService } from './kafka.service';

@Global()
@Module({})
export class KafkaSharedModule {
  static register(options: KafkaSharedOptions): DynamicModule {
    const { groupId } = options;

    return {
      module: KafkaSharedModule,
      imports: [
        ClientsModule.register([
          {
            name: KAFKA_CLIENT_NAME,
            transport: Transport.KAFKA,
            options: {
              client: { brokers: KAFKA_BROKERS },
              consumer: { groupId },
            },
          },
        ]),
      ],
      providers: [KafkaProducerService],
      exports: [KafkaProducerService, ClientsModule],
    };
  }
}
