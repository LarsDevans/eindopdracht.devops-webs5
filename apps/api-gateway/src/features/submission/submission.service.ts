import { Injectable } from '@nestjs/common';
import { HttpRequestService } from '../../common/http-requests/http-request.service';
import { SUBMISSION_SERVICE_URL } from '../../config/api.constants';
import { generateOpaqueToken } from '../auth/utils/jwt.util';

@Injectable()
export class SubmissionService {
  constructor(private readonly httpRequestService: HttpRequestService) {}

  async getHello(): Promise<string> {
    try {
      const headers = {
        Authorization: `Bearer ${generateOpaqueToken('submission')}`,
      };

      const result = await this.httpRequestService.sendRequest<string>(
        'GET',
        `${SUBMISSION_SERVICE_URL}`,
        null,
        headers,
      );

      return result;
    } catch (error) {
      console.error('Error getting hello:', error);
      return error.message;
    }
  }
}
