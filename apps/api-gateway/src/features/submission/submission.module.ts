import { Module } from '@nestjs/common';
import { Submission } from './submission.service';
import { SubmissionController } from './submission.controller';
import { HttpRequestModule } from '../../common/http-requests/http-request.module';

@Module({
  imports: [HttpRequestModule],
  controllers: [SubmissionController],
  providers: [Submission],
})
export class SubmissionModule {}
