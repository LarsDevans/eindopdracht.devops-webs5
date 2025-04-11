import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailService } from '../mail.service';
import { UsersModule } from '../users/users.module';
import { Target } from './entity/target.entity';
import { TargetsController } from './targets.controller';
import { TargetsService } from './targets.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Target])],
  controllers: [TargetsController],
  providers: [TargetsService, MailService],
  exports: [TargetsService],
})
export class TargetsModule {}
