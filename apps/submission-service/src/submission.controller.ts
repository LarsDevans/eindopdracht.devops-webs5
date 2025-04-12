import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KAFKA_CLIENT_NAME, KafkaService } from '@app/kafka';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Public } from '@app/auth';

@ApiBearerAuth()
@ApiTags('Submission Controller')
@Controller()
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    @Inject(KAFKA_CLIENT_NAME) private readonly kafkaService: KafkaService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create a new submission',
    description:
      'Creates a new submission with provided data. All fields are required.',
  })
  @ApiBody({ type: CreateSubmissionDto })
  @ApiResponse({ status: 201, description: 'Submission created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    const result = await this.submissionService.create(createSubmissionDto);
    if (result.success) {
      console.log(result.reason);

      this.kafkaService.emit('submission.created', {
        topic: 'submission.created',
        timestamp: new Date().toISOString(),
        data: result.data,
      });
    }

    return { message: 'Submission created successfully', data: result.data };
  }
}
