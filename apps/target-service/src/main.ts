import { NestFactory } from '@nestjs/core';
import { TargetServiceModule } from './target-service.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      TargetServiceModule,
    );
  await app.listen();
}
bootstrap();
