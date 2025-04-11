import { KAFKA_CLIENT_NAME, KafkaService } from '@app/kafka';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateTargetDto } from '@app/types';
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

  @Get()
  @ApiOperation({
    summary: 'Find a target',
    description: 'Finds a target with provided data. All fields are optional.',
  })
  @ApiQuery({
    description: 'Latitude coordinate',
    example: '40.4447 N',
    name: 'lat',
    required: false,
    type: String,
  })
  @ApiQuery({
    description: 'Longtitude coordinate',
    example: '3.9525 W',
    name: 'lon',
    required: false,
    type: String,
  })
  @ApiResponse({ status: 201, description: 'Target created successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(@Query('lat') lat: string, @Query('lon') lon: string) {
    if (lat && lon) {
      const queriedTargets = await this.targetService.findAllByCoordinates(
        lat,
        lon,
      );
      if (queriedTargets.success) {
        return queriedTargets;
      }
    }

    const targets = await this.targetService.findAll();
    if (targets.success) {
      return targets;
    }
  }
}
