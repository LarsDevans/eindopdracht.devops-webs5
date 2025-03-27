import { Injectable } from '@nestjs/common';

@Injectable()
export class ClockServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
