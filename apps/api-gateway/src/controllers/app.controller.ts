import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('Gateway')
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    return this.appService.getHello();
  }
}
