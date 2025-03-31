import { NestFactory } from '@nestjs/core';
import { SubmissionServiceModule } from './submission-service.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SubmissionServiceModule);

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle("Submission Service")
    .addBasicAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger-ui", app, document)

  await app.listen(process.env.port ?? 3000);
  await app.startAllMicroservices()
}
bootstrap();
