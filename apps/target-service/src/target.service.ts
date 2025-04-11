import { Injectable } from '@nestjs/common';

@Injectable()
export class TargetService {
  getHello(): string {
    return 'Hello World!';
  }
}
