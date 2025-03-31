import { NestFactory } from '@nestjs/core';
import { ScoreServiceModule } from './score-service.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ScoreServiceModule,
  );
  await app.listen();
}
bootstrap();
