import { KAFKA_CLIENT_NAME, KafkaService } from '@app/kafka';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTargetDto } from './dto/create-target.dto';
import { TargetService } from './target.service';

@ApiTags('Target Controller')
@Controller()
export class TargetController {
  constructor(
    private readonly targetService: TargetService,
    @Inject(KAFKA_CLIENT_NAME) private readonly kafkaService: KafkaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new target',
    description:
      'Creates a new target with provided data. All fields are required.',
  })
  @ApiBody({ type: CreateTargetDto })
  @ApiResponse({ status: 201, description: 'Target created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createTargetDto: CreateTargetDto) {
    const result = await this.targetService.create(createTargetDto);
    if (result.success) {
      this.kafkaService.emit('target.created', {
        topic: 'target.created',
        timestamp: Date(),
        data: result.data,
      });
    }

    return { message: 'Target created successfully', data: result.data };
  }
}
