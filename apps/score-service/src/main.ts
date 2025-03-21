import { NestFactory } from '@nestjs/core';
import { ScoreServiceModule } from './score-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ScoreServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
