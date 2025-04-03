import { Controller, Get } from '@nestjs/common';
import { ClockServiceService } from './clock-service.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('clock')
@Controller()
export class ClockServiceController {
  constructor(private readonly clockServiceService: ClockServiceService) {}

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
    return this.clockServiceService.getHello();
  }
}
