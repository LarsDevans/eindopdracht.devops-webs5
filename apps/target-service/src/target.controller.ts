import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TargetService } from './target.service';

@ApiBearerAuth()
@ApiTags('target')
@Controller()
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

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
    return this.targetService.getHello();
  }
}
