import { Module } from '@nestjs/common';
import { TargetsController } from './targets.controller';
import { MailService } from '../mail.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TargetsController],
  providers: [MailService],
})
export class TargetsModule {}
