import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@app/auth';

@Controller()
@ApiTags('gateway')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
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
