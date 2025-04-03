import { Controller, Get } from '@nestjs/common';
import { SubmissionServiceService } from './submission-service.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('submission')
@Controller()
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
