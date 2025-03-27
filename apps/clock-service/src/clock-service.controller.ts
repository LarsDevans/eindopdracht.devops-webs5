import { Controller, Get } from '@nestjs/common';
import { ClockServiceService } from './clock-service.service';

@Controller()
export class ClockServiceController {
  constructor(private readonly clockServiceService: ClockServiceService) {}

  @Get()
  getHello(): string {
    return this.clockServiceService.getHello();
  }
}
