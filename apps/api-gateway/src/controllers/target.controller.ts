import { Body, Controller, Post, Req } from '@nestjs/common';
import { TargetService } from '../services/target.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateTargetDto } from '@app/types';
import { CreateTargetDto as GatewayCreateTargetDto } from '../dto/create-target.dto';
import * as jwt from 'jsonwebtoken';

@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create a new target',
    description:
      'Creates a new target with provided data. All fields are required.',
  })
  @ApiBody({ type: GatewayCreateTargetDto })
  @ApiResponse({ status: 201, description: 'Target created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body() gatewayCreateTargetDto: GatewayCreateTargetDto,
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

    const createTargetDto: CreateTargetDto = {
      ...gatewayCreateTargetDto,
      ownerUuid,
    };

    return this.targetService.create(createTargetDto);
  }
}
