import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoreServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
