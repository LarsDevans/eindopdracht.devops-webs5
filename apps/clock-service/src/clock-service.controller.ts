import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClockServiceService } from './clock-service.service';

@Controller()
export class ClockServiceController {
  constructor(private readonly clockServiceService: ClockServiceService) {}

  @Get()
  getHello(): string {
    return this.clockServiceService.getHello();
  }

  @Post()
  async createNotification(@Body() data: any) {
    this.clockServiceService.sendNotification(data);
    return { 
      message: 'Notificatie verstuurd!' 
    };
  }
}
