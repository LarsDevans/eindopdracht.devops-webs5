import { Controller, Get } from '@nestjs/common';
import { SubmissionServiceService } from './submission-service.service';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Submission')
@ApiBasicAuth()
export class SubmissionServiceController {
  constructor(
    private readonly submissionServiceService: SubmissionServiceService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns hello',
  })
  @ApiOperation({
    summary: 'Hello',
    description: 'Returns hello',
  })
  getHello(): string {
    return this.submissionServiceService.getHello();
  }
}
