import { NestFactory } from '@nestjs/core';
import { TargetServiceModule } from './target-service.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(TargetServiceModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Target Service')
    .setDescription('The target service API description')
    .setVersion('1.0')
    .addTag('target')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port ?? 3000);
  await app.startAllMicroservices();
}
bootstrap();
