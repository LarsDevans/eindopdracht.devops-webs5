import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Submission } from './submission.service';
import * as jwt from 'jsonwebtoken';
import { CreateSubmissionDto as GatewayCreateSubmissionDto } from './dto/create-submission.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSubmissionDto } from '@app/types';

@Controller('submission')
@ApiTags('submission')
export class SubmissionController {
  constructor(private readonly submission: Submission) {}

  @Get('/all')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAll(@Query('targetUuid') targetUuid: string, @Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token) as { sub?: string };
    const userUuid = decoded?.sub;

    if (!userUuid) {
      throw new UnauthorizedException(
        'Invalid token: missing subject (user id)',
      );
    }

    return this.submission.getAll(userUuid, targetUuid);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create a new submission',
    description:
      'Creates a new submission with provided data. All fields are required.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        targetUuid: {
          type: 'string',
          example: '075d989d-e4bc-4e4f-b350-6406dea6b9eb',
        },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Submission created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: GatewayCreateSubmissionDto,
    @Req() req: Request,
  ) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token) as { sub?: string };
    const userUuid = decoded?.sub;
    if (!userUuid) {
      throw new UnauthorizedException(
        'Invalid token: missing subject (user id)',
      );
    }

    if (!image) {
      throw new UnauthorizedException('Image is required');
    }

    const submissionDto: CreateSubmissionDto = {
      imageBuffer: image.buffer.toString('base64'),
      targetUuid: dto.targetUuid,
      ownerUuid: userUuid,
    };

    return this.submission.create(submissionDto);
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
