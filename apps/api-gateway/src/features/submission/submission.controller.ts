import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Submission } from './submission.service';
import { CreateSubmissionDto } from 'apps/submission-service/src/dto/create-submission.dto';
import * as jwt from 'jsonwebtoken';

@Controller('submission')
@ApiTags('submission')
export class SubmissionController {
  constructor(private readonly submission: Submission) {}

  @Post()
  @ApiBearerAuth('access-token')
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
    this.submission.create(createSubmissionDto);
  }

  @Delete()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Remove a submission',
    description: 'Remove a submission with the UUID.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        uuid: {
          type: 'string',
          example: '075d989d-e4bc-4e4f-b350-6406dea6b9eb',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Submission removed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Body() data: any, @Req() req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token) as { sub?: string };

    if (!data.uuid) {
      return { message: 'uuid is required' };
    }

    return this.submission.remove(data.uuid, decoded.sub);
  }
}
