import { NestFactory } from '@nestjs/core';
import { SubmissionServiceModule } from './submission-service.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    SubmissionServiceModule,
  );

  const queues = [
    process.env.RABBITMQ_RIVAL_CREATED_QUEUE,
    process.env.RABBITMQ_RIVAL_REVOKED_QUEUE,
    process.env.RABBITMQ_RIVAL_UPLOAD_FAILED_QUEUE,
  ];

  queues.forEach((queue) => {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}`],
        queue,
        noAck: false,
      },
    });
  });

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Submission Service')
    .setDescription('The submission service API description')
    .setVersion('1.0')
    .addTag('submission')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port ?? 3000);
  await app.startAllMicroservices();
}
bootstrap();
