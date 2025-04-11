import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export async function handleHttpRequest<T>(
  observable: Observable<T>,
  context: string,
): Promise<T> {
  try {
    const result = await firstValueFrom(
      observable.pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An unknown error occurred!';
          throw new Error(`Error during ${context}: ${errorMessage}`);
        }),
      ),
    );
    return result;
  } catch (error) {
    console.log(`Error during ${context}:`, error);
    throw new Error(`Error: ${error.message}`);
  }
}
