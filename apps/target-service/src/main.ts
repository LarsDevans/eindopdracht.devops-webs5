import { NestFactory } from '@nestjs/core';
import { TargetServiceModule } from './target-service.module';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(TargetServiceModule);

  const queues = [
    process.env.RABBITMQ_TARGET_CREATED_QUEUE,
    process.env.RABBITMQ_TARGET_COMPLETED_QUEUE,
    process.env.RABBITMQ_TARGET_REVOKED_QUEUE,
    process.env.RABBITMQ_TARGET_TTL_RIVALS_QUEUE,
  ];

  queues.forEach(queue => {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}`],
        queue,
        noAck: false,
      },
    });
  });

  await app.listen(3000)
  await app.startAllMicroservices()
}

bootstrap();
