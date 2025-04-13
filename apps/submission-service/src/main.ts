import { NestFactory } from '@nestjs/core';
import { SubmissionModule } from './submission.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { attachKafka } from '@app/kafka';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(SubmissionModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Submission Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: process.env.BODY_LIMIT }));
  app.use(
    bodyParser.urlencoded({ limit: process.env.BODY_LIMIT, extended: true }),
  );

  await app.listen(process.env.port ?? 3000);
  await attachKafka(app, 'submission-consumer');
}
bootstrap();
