import { Controller, Get } from '@nestjs/common';
import { TargetServiceService } from './target-service.service';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TargetServiceController {
  constructor(private readonly targetServiceService: TargetServiceService) {}

  @Get()
  getHello(): string {
    return this.targetServiceService.getHello();
  }

  @MessagePattern('notification_created')
  handleNotification(@Payload() data: any, @Ctx() context: any) {
    console.log('Received notification:', data);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
