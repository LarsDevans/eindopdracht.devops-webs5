import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ImaggaConfig } from './config';

@Injectable()
export class ImaggaService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('ImaggaConfig')
    private readonly config: ImaggaConfig,
  ) {}

  async getSimilarity(image1Url: string, image2Url: string) {
    const url = this.buildSimilarityUrl(image1Url, image2Url);

    const response = await lastValueFrom(
      this.httpService.get(url, {
        auth: {
          username: this.config.apiKey,
          password: this.config.apiSecret,
        },
      }),
    );

    return response.data.result.distance;
  }

  private buildSimilarityUrl(image1Url: string, image2Url: string): string {
    const baseUrl = `${this.config.endpoint}/images-similarity/categories/`;
    const queryParams = new URLSearchParams({
      image_url: image1Url,
      image2_url: image2Url,
    });

    return `${baseUrl}${this.config.categorizer}?${queryParams.toString()}`;
  }
}
