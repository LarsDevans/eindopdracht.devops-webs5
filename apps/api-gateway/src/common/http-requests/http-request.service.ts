import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class HttpRequestService {
  constructor(private readonly httpService: HttpService) {}

  async sendRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data: any = null,
    headers: Record<string, string> = {},
  ): Promise<T> {
    try {
      const config: any = {
        method,
        url,
        headers,
      };

      if (method === 'GET') {
        config.params = data;
      } else {
        config.data = data;
      }

      const observable: Observable<T> = this.httpService
        .request<T>(config)
        .pipe(map((response) => response.data));

      return await firstValueFrom(
        observable.pipe(
          catchError((error: AxiosError) => {
            const errorMessage =
              error.response?.data || 'An unknown error occurred!';
            throw new Error(`HTTP Error: ${JSON.stringify(errorMessage)}`);
          }),
        ),
      );
    } catch (error) {
      console.error(`Error during HTTP request to ${url}:`, error);
      throw new Error(`Error: ${error.message}`);
    }
  }
}
