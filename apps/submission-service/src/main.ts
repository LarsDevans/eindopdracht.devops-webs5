import { NestFactory } from '@nestjs/core';
import { SubmissionServiceModule } from './submission-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SubmissionServiceModule,
    {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq-service:5672'],
          queue: 'submission_queue',
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
