import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom, map, throwError } from 'rxjs';
import { AxiosError } from 'axios';

// Use CommonJS-style import to avoid "not a constructor" error
// eslint-disable-next-line @typescript-eslint/no-require-imports
const CircuitBreaker = require('opossum');

@Injectable()
export class HttpRequestService {
  private breaker: typeof CircuitBreaker;

  constructor(private readonly httpService: HttpService) {
    this.breaker = new CircuitBreaker(this.makeRequest.bind(this), {
      timeout: process.env.CB_TIMEOUT,
      errorThresholdPercentage: process.env.CB_PERCENTAGE_FAILED,
      resetTimeout: process.env.CB_RESET_TIMEOUT,
    });

    this.breaker.fallback(() => {
      throw new Error(
        'Circuit breaker fallback: Service temporarily unavailable.',
      );
    });

    this.breaker.on('open', () => console.warn('⚠️ Circuit breaker opened'));
    this.breaker.on('close', () => console.info('✅ Circuit breaker closed'));
    this.breaker.on('halfOpen', () =>
      console.info('⏳ Circuit breaker half-open'),
    );
  }

  private async makeRequest<T>(config: any): Promise<T> {
    const observable: Observable<T> = this.httpService
      .request<T>(config)
      .pipe(map((response) => response.data));

    return await firstValueFrom(
      observable.pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An unknown error occurred!';
          return throwError(
            () => new Error(`HTTP Error: ${JSON.stringify(errorMessage)}`),
          );
        }),
      ),
    );
  }

  async sendRequest<T = any>(
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

      return (await this.breaker.fire(config)) as T;
    } catch (error: any) {
      console.error(`Error during HTTP request to ${url}:`, error);
      throw new Error(`Error: ${error.message}`);
    }
  }
}
