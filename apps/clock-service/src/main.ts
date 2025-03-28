import { NestFactory } from '@nestjs/core';
import { ClockServiceModule } from './clock-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ClockServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}`],
        queue: `${process.env.RABBITMQ_CLOCK_QUEUE}`,
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
