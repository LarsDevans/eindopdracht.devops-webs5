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
    const url =
      'https://api.imagga.com/v2/images-similarity/categories/' +
      this.config.categorizer +
      '?image_url=' +
      encodeURIComponent(image1Url) +
      '&image2_url=' +
      encodeURIComponent(image2Url);

    const response = await lastValueFrom(
      this.httpService.get(url, {
        auth: {
          username: this.config.apiKey,
          password: this.config.apiSecret,
        },
      }),
    );
    const data = response.data;
    const distance = data.result.distance;

    return distance;
  }
}
