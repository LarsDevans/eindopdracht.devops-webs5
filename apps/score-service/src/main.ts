import { NestFactory } from '@nestjs/core';
import { ScoreModule } from './score.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { attachKafka } from '@app/kafka';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ScoreModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Score Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port ?? 3000);
  await attachKafka(app, 'score-consumer');
}
bootstrap();
