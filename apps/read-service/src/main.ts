import { NestFactory } from '@nestjs/core';
import { ReadServiceModule } from './read-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ReadServiceModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}`],
      queue: `${process.env.RABBITMQ_READ_QUEUE}`,
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
