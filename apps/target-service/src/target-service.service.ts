import { Injectable } from '@nestjs/common';

@Injectable()
export class TargetServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
