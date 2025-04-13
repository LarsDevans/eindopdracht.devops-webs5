import { Controller, Req, Get, Query } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { getUuidFromToken } from '@app/auth';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('/all')
  @ApiOperation({ summary: 'Get all scores' })
  @ApiResponse({ status: 200, description: 'All scores' })
  @ApiBearerAuth('access-token')
  async getAllScores(
    @Query('targetUuid') targetUuid: string,
    @Req() req: Request,
  ) {
    const userUuid = getUuidFromToken(req);
    return this.scoreService.getAllScores(userUuid, targetUuid);
  }

  // Get eigen score op submission
}
