import { Controller, Get } from '@nestjs/common';
import { ScoreServiceService } from './score-service.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('score')
@Controller()
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
