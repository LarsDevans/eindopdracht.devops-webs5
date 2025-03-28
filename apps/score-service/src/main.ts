import { NestFactory } from '@nestjs/core';
import { ScoreServiceModule } from './score-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ScoreServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}`],
        queue: `${process.env.RABBITMQ_SCORE_QUEUE}`,
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
