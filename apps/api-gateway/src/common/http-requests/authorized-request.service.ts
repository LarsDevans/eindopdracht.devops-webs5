import { Injectable } from '@nestjs/common';
import { HttpRequestService } from './http-request.service';
import { generateOpaqueToken } from '@app/auth';

@Injectable()
export class AuthorizedRequestService {
  constructor(private readonly httpRequestService: HttpRequestService) {}

  async sendAuthorizedRequest<T>(
    serviceName: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data: any = null,
  ): Promise<T> {
    const headers = {
      Authorization: `Bearer ${generateOpaqueToken(serviceName)}`,
    };

    return this.httpRequestService.sendRequest<T>(method, url, data, headers);
  }
}
