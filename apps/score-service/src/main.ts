import { NestFactory } from '@nestjs/core';
import { ScoreServiceModule } from './score-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(ScoreServiceModule);

  const queues = [
    process.env.RABBITMQ_RIVAL_GRADED_QUEUE,
    process.env.RABBITMQ_RIVAL_GRADE_FAILED_QUEUE,
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
    .setTitle('Score Service')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(process.env.port ?? 3000);
  await app.startAllMicroservices();
}
bootstrap();
