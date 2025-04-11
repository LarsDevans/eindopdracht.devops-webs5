import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TargetModule } from './target.module';
import { attachKafka } from '@app/kafka';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(TargetModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Clock Service')
    .setDescription('The clock service API description')
    .setVersion('1.0')
    .addTag('clock')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port ?? 3000);
  await attachKafka(app, 'target-consumer');
}
bootstrap();
