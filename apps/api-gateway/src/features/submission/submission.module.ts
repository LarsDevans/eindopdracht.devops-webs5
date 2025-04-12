import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { HttpRequestModule } from '../../common/http-requests/http-request.module';

@Module({
  imports: [HttpRequestModule],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
