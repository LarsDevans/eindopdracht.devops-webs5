import { Module } from '@nestjs/common';
import { ScoreServiceController } from './score-service.controller';
import { ScoreServiceService } from './score-service.service';

@Module({
  imports: [],
  controllers: [ScoreServiceController],
  providers: [ScoreServiceService],
})
export class ScoreServiceModule {}
