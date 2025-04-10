import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { KAFKA_BROKERS, KAFKA_CLIENT_NAME } from './kafka.constants';
import { KafkaSharedOptions } from './kafka.interfaces';
import { KafkaService } from './kafka.service';

@Global()
@Module({})
export class KafkaModule {
  static register(options: KafkaSharedOptions): DynamicModule {
    const { groupId } = options;

    return {
      module: KafkaModule,
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
      providers: [KafkaService],
      exports: [KafkaService, ClientsModule],
    };
  }
}
