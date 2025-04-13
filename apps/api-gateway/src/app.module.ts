import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, AuthGuard, UserModule } from '@app/auth';
import { APP_GUARD } from '@nestjs/core';
import { KafkaModule } from '@app/kafka';
import { TargetModule } from './features/target/target.module';
import { HttpModule } from '@nestjs/axios';
import { SubmissionModule } from './features/submission/submission.module';
import { PrometheusModule } from '@app/prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
    UserModule,
    KafkaModule.register({ groupId: 'gateway-consumer' }),
    TargetModule,
    SubmissionModule,
    PrometheusModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
