import { Controller, Get } from '@nestjs/common';
import { ScoreServiceService } from './score-service.service';

@Controller()
export class ScoreServiceController {
  constructor(private readonly scoreServiceService: ScoreServiceService) {}

  @Get()
  getHello(): string {
    return this.scoreServiceService.getHello();
  }
}
