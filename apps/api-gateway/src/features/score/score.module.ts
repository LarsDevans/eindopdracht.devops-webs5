import { Module } from '@nestjs/common';
import { HttpRequestModule } from '../../common/http-requests/http-request.module';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

@Module({
  imports: [HttpRequestModule],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
