import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TargetService } from '../target/target.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTargetDto } from '@app/types';
import { CreateTargetDto as GatewayCreateTargetDto } from './dto/create-target.dto';
import * as jwt from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('target')
@ApiTags('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Post('create')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create a new target',
    description:
      'Creates a new target with provided data. All fields are required.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        durationHours: { type: 'number', example: 72 },
        nearbyLatitude: { type: 'string', example: '40.4447 N' },
        nearbyLongitude: { type: 'string', example: '3.9525 W' },
        radiusMeters: { type: 'number', example: 200 },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Target created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: GatewayCreateTargetDto,
    @Req() req: Request,
  ) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    const decodedToken = jwt.decode(token) as { sub: string };
    const ownerUuid = decodedToken?.sub;
    if (!ownerUuid) {
      throw new Error('Owner UUID is missing in the token');
    }

    const imageBuffer = Buffer.from(image.buffer);
    const imageBase64 = imageBuffer.toString('base64');

    const createTargetDto: CreateTargetDto = {
      imageBuffer: imageBase64,
      imageMimeType: image.mimetype,
      durationHours: Number(dto.durationHours),
      nearbyLatitude: dto.nearbyLatitude,
      nearbyLongitude: dto.nearbyLongitude,
      radiusMeters: Number(dto.radiusMeters),
      ownerUuid,
    };

    return this.targetService.create(createTargetDto);
  }
}
