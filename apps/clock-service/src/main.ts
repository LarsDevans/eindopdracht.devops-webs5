import { NestFactory } from '@nestjs/core';
import { ClockServiceModule } from './clock-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(ClockServiceModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Clock Service')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
