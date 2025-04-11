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
      const observable: Observable<T> = this.httpService
        .request<T>({
          method,
          url,
          data,
          headers,
        })
        .pipe(map((response) => response.data));

      return await firstValueFrom(
        observable.pipe(
          catchError((error: AxiosError) => {
            const errorMessage =
              error.response?.data || 'An unknown error occurred!';
            throw new Error(`HTTP Error: ${errorMessage}`);
          }),
        ),
      );
    } catch (error) {
      console.error(`Error during HTTP request to ${url}:`, error);
      throw new Error(`Error: ${error.message}`);
    }
  }
}
