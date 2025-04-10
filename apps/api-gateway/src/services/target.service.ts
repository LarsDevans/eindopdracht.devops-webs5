import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TARGET_SERVICE_URL } from '../common/api.constants';
import { handleHttpRequest } from '../common/http-request.util';

@Injectable()
export class TargetService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<string> {
    try {
      const result = await handleHttpRequest(
        this.httpService.get<string>(`${TARGET_SERVICE_URL}`),
        'getHello',
      );

      return result.data;
    } catch (error) {
      return error.message;
    }
  }
}
