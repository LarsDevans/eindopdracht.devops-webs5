import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { TARGET_SERVICE_URL } from '../common/constants/api.constants';

@Injectable()
export class TargetService {
  constructor(private readonly httpService: HttpService) {}

  async testConnection(): Promise<string> {
    try {
      const result = await firstValueFrom(
        this.httpService.get<string>(`${TARGET_SERVICE_URL}`).pipe(
          catchError((error: AxiosError) => {
            const errorMessage =
              error.response?.data || 'An unknown error occurred!';
            throw new Error(`Error during testConnection: ${errorMessage}`);
          }),
        ),
      );

      console.log('Response:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error during testConnection:', error.message);
    }
  }
}
