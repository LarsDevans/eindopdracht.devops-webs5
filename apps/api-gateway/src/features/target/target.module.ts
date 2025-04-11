import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { HttpRequestModule } from '../../common/http-requests/http-request.module';

@Module({
  imports: [HttpRequestModule],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
