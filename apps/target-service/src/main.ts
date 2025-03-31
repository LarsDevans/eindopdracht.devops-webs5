import { NestFactory } from '@nestjs/core';
import { TargetServiceModule } from './target-service.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(TargetServiceModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle("Clock Service")
    .addBasicAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger-ui", app, document)

  await app.listen(process.env.port ?? 3000);
  await app.startAllMicroservices()
}
bootstrap();
