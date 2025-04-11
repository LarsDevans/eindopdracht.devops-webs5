import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TargetController } from './controllers/target.controller';
import { TargetService } from './services/target.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/auth.guard';
import { HttpRequestService } from './services/http-request.service';
import { KafkaModule } from '@app/kafka';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
    KafkaModule.register({ groupId: 'gateway-consumer' }),
  ],
  controllers: [AppController, TargetController],
  providers: [
    AppService,
    TargetService,
    HttpRequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, // TODO: CHECK OF DE GEBRUIKER IN DE DATABASE STAAT
  ],
})
export class AppModule {}
