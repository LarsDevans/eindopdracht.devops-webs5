import { Controller, Get } from '@nestjs/common';
import { ClockServiceService } from './clock-service.service';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Clock')
@ApiBasicAuth()
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
