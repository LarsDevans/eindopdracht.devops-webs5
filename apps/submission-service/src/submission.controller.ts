import { Controller, Get } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('submission')
@Controller()
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

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
    return this.submissionService.getHello();
  }
}
