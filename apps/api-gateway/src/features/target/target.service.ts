import { Injectable } from '@nestjs/common';
import { TARGET_SERVICE_URL } from '../../config/api.constants';
import { HttpRequestService } from '../../common/http-requests/http-request.service';
import { generateOpaqueToken } from '../auth/utils/jwt.util';
import { CreateTargetDto } from '@app/types';

@Injectable()
export class TargetService {
  constructor(private readonly httpRequestService: HttpRequestService) {}

  async create(createTargetDto: CreateTargetDto): Promise<string> {
    try {
      const headers = {
        Authorization: `Bearer ${generateOpaqueToken('target')}`,
      };

      const result = await this.httpRequestService.sendRequest<string>(
        'POST',
        `${TARGET_SERVICE_URL}`,
        createTargetDto,
        headers,
      );

      return result;
    } catch (error) {
      console.error('Error creating target:', error);
      return error.message;
    }
  }
}
