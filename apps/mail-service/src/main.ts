import { NestFactory } from '@nestjs/core';
import { MailServiceModule } from './mail-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}`],
        queue: `${process.env.RABBITMQ_MAIL_QUEUE}`,
        noAck: false,
      },
    },
  );
  await app.listen();
}
bootstrap();
