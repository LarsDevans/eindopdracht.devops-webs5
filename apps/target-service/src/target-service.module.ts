import { Module } from '@nestjs/common';
import { TargetServiceController } from './target-service.controller';
import { TargetServiceService } from './target-service.service';

@Module({
  imports: [],
  controllers: [TargetServiceController],
  providers: [TargetServiceService],
})
export class TargetServiceModule {}
