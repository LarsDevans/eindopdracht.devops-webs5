import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { TargetService } from '../target/target.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTargetDto } from '@app/types';
import { CreateTargetDto as GatewayCreateTargetDto } from './dto/create-target.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getUuidFromToken } from '@app/auth';

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
        image: { type: 'string', format: 'binary' },
        durationHours: { type: 'number', example: 72 },
        nearbyLatitude: { type: 'string', example: '40.4447 N' },
        nearbyLongitude: { type: 'string', example: '3.9525 W' },
        radiusMeters: { type: 'number', example: 200 },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Target created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: GatewayCreateTargetDto,
    @Req() req: Request,
  ) {
    const userUuid = getUuidFromToken(req);

    if (!image) {
      throw new BadRequestException('Image is required');
    }

    const createTargetDto: CreateTargetDto = {
      imageBuffer: image.buffer.toString('base64'),
      durationHours: Number(dto.durationHours),
      nearbyLatitude: dto.nearbyLatitude,
      nearbyLongitude: dto.nearbyLongitude,
      radiusMeters: Number(dto.radiusMeters),
      ownerUuid: userUuid,
    };

    return this.targetService.create(createTargetDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
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
    return this.targetService.findAll(lat, lon);
  }
}
