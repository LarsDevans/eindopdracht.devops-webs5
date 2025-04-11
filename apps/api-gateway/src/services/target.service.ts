import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TARGET_SERVICE_URL } from '../common/api.constants';
import { handleHttpRequest } from '../common/http-request.util';
import { generateOpaqueToken } from '../common/jwt.util';
import { CreateTargetDto } from '@app/types';

@Injectable()
export class TargetService {
  constructor(private readonly httpService: HttpService) {}

  async create(createTargetDto: CreateTargetDto): Promise<string> {
    try {
      const result = await handleHttpRequest(
        this.httpService.post<string>(
          `${TARGET_SERVICE_URL}`,
          createTargetDto,
          {
            headers: {
              Authorization: `Bearer ${generateOpaqueToken('target')}`,
            },
          },
        ),
        'create target',
      );

      return result.data;
    } catch (error) {
      console.error('Error creating target:', error);
      return error.message;
    }
  }
}
