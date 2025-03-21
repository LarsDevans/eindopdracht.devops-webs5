import { Module } from '@nestjs/common';
import { ClockServiceController } from './clock-service.controller';
import { ClockServiceService } from './clock-service.service';

@Module({
  imports: [],
  controllers: [ClockServiceController],
  providers: [ClockServiceService],
})
export class ClockServiceModule {}
