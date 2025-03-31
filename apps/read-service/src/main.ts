import { NestFactory } from '@nestjs/core';
import { ReadServiceModule } from './read-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ReadServiceModule);

  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
