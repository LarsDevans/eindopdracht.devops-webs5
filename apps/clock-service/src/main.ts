import { NestFactory } from '@nestjs/core';
import { ClockServiceModule } from './clock-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ClockServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
