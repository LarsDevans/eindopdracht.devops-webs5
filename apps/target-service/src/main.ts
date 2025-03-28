import { NestFactory } from '@nestjs/core';
import { TargetServiceModule } from './target-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TargetServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}`],
        queue: `${process.env.RABBITMQ_TARGET_QUEUE}`,
        noAck: false,
      },
    },
  );
  await app.listen();
}
bootstrap();
