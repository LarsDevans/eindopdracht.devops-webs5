import { Controller, Get } from '@nestjs/common';
import { ScoreServiceService } from './score-service.service';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Score')
@ApiBasicAuth()
export class ScoreServiceController {
  constructor(private readonly scoreServiceService: ScoreServiceService) {}

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
    return this.scoreServiceService.getHello();
  }
}
