import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TARGET_SERVICE_URL } from '../common/api.constants';
import { handleHttpRequest } from '../common/http-request.util';
import { generateOpaqueToken } from '../common/jwt.util';

@Injectable()
export class TargetService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<string> {
    try {
      const result = await handleHttpRequest(
        this.httpService.get<string>(`${TARGET_SERVICE_URL}`, {
          headers: {
            Authorization: `Bearer ${generateOpaqueToken('target')}`,
          },
        }),
        'getHello',
      );

      return result.data;
    } catch (error) {
      return error.message;
    }
  }
}
