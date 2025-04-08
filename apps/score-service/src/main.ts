import { NestFactory } from '@nestjs/core';
import { ScoreServiceModule } from './score-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(ScoreServiceModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Score Service')
    .setDescription('The score service API description')
    .setVersion('1.0')
    .addTag('score')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port ?? 3000);
  await app.startAllMicroservices();
}
bootstrap();
