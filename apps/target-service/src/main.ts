import { NestFactory } from '@nestjs/core';
import { TargetServiceModule } from './target-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TargetServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
