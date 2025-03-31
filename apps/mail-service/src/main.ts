import { NestFactory } from '@nestjs/core';
import { MailServiceModule } from './mail-service.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailServiceModule,
  );
  await app.listen();
}
bootstrap();
