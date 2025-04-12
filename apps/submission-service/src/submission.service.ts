import { Injectable } from '@nestjs/common';

@Injectable()
export class SubmissionService {
  getHello(): string {
    return 'Hello World!';
  }
}
