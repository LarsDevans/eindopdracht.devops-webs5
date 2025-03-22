import { NestFactory } from '@nestjs/core';
import { ClockServiceModule } from './clock-service.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      ClockServiceModule,
    );
  await app.listen();
}
bootstrap();
