import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KAFKA_CLIENT_NAME, KafkaService } from '@app/kafka';
import { CreateSubmissionDto } from '@app/types';
import { TargetsService } from './targets/targets.service';
import { Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Submission Controller')
@Controller()
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly targetsService: TargetsService,
    @Inject(KAFKA_CLIENT_NAME) private readonly kafkaService: KafkaService,
  ) {}

  @Get('/all')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAll(
    @Query('targetUuid') targetUuid: string,
    @Query('userUuid') userUuid: string,
  ) {
    const targetResult = await this.targetsService.findOne(targetUuid);
    if (!targetResult.data) {
      return { message: `Can not find target ${targetUuid}` };
    }

    const submissionResult = await this.submissionService.findByTarget(
      targetResult.data.uuid,
    );

    if (userUuid == targetResult.data.ownerUuid) {
      return submissionResult.data;
    }

    return {
      message: `You are not allowed to view the details of target ${targetUuid}`,
    };
  }

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
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    const targetResult = await this.targetsService.findOne(
      createSubmissionDto.targetUuid,
    );

    if (targetResult.data.closedForSubmission) {
      return {
        message: 'Failed to send submission. Submission timeframe has passed.',
        data: null,
      };
    }

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

  @Delete()
  @ApiOperation({
    summary: 'Remove a submission',
    description: 'Remove a submission with the UUID.',
  })
  @ApiBody({ type: CreateSubmissionDto })
  @ApiResponse({ status: 200, description: 'Submission removed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Payload() data: { uuid: string; userUuid: string }) {
    const { uuid, userUuid } = data;
    const submissionResult = await this.submissionService.findOne(uuid);
    if (!submissionResult.data) {
      return { message: `Submission ${uuid} does not exists.` };
    }

    const { targetUuid, ownerUuid } = submissionResult.data;
    const targetResult = await this.targetsService.findOne(targetUuid);

    if (userUuid != ownerUuid || userUuid != targetResult.data.ownerUuid) {
      return { message: `You are not allowed to remove ${uuid}.` };
    }

    const removeResult = await this.submissionService.remove(uuid);
    return { message: removeResult.reason };
  }
}
