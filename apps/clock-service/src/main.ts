import { NestFactory } from '@nestjs/core';
import { ClockServiceModule } from './clock-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(ClockServiceModule);

  const queues = [process.env.RABBITMQ_TARGET_COMPLETED_QUEUE];

  queues.forEach((queue) => {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}`],
        queue,
        noAck: false,
      },
    });
  });

  // Swagger / OA docs
  const config = new DocumentBuilder()
    .setTitle('Clock Service')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(process.env.port ?? 3000);
  await app.startAllMicroservices();
}
bootstrap();
