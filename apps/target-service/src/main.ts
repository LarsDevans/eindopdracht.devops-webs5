import { NestFactory } from '@nestjs/core';
import { TargetServiceModule } from './target-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      TargetServiceModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq-service:5672'],
          queue: 'target_queue',
          noAck: false,
          queueOptions: {
            durable: false
          },
        },
      },
    );
  await app.listen();
}
bootstrap();
