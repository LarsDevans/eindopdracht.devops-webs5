import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Submission } from './submission.service';

@Controller('submission')
@ApiTags('submission')
export class SubmissionController {
  constructor(private readonly submission: Submission) {}

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get hello message' })
  async getHello(): Promise<string> {
    return await this.submission.getHello();
  }
}
