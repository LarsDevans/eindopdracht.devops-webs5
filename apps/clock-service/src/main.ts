import { NestFactory } from '@nestjs/core';
import { ClockServiceModule } from './clock-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      ClockServiceModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq-service:5672'],
          queue: 'clock_queue',
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
