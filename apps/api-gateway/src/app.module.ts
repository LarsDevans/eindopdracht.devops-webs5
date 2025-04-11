import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TargetController } from './controllers/target.controller';
import { TargetService } from './services/target.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
  ],
  controllers: [AppController, TargetController],
  providers: [AppService, TargetService],
})
export class AppModule {}
