import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { UsersModule } from '../users/users.module';
import { MailService } from '../mail.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Submission])],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, MailService],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}
