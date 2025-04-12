import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TargetModule } from './target.module';
import { attachKafka } from '@app/kafka';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(TargetModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Target Service')
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
  await attachKafka(app, 'target-consumer');
}
bootstrap();
