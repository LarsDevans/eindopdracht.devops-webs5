import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ClockServiceService {
  constructor(@Inject('CLOCK_SERVICE') private readonly client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendNotification(data: any) {
    this.client.emit('notification_created', data);
  }
}
