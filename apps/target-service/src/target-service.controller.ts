import { Controller, Get } from '@nestjs/common';
import { TargetServiceService } from './target-service.service';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Target')
@ApiBasicAuth()
export class TargetServiceController {
  constructor(private readonly targetServiceService: TargetServiceService) {}

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
    return this.targetServiceService.getHello();
  }
}
