import { NestFactory } from '@nestjs/core';
import { ReadServiceModule } from './read-service.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ReadServiceModule);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
