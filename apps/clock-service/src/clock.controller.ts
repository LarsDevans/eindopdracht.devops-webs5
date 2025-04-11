import { Controller, Get } from '@nestjs/common';
import { ClockService } from './clock.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('clock')
@Controller()
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

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
    return this.clockService.getHello();
  }
}
