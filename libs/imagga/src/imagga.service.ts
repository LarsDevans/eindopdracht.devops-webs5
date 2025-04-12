import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import FormData from 'form-data';
import * as fs from 'fs';
import { Buffer } from 'buffer';
import { ImaggaConfig } from './config';

@Injectable()
export class ImaggaService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('ImaggaConfig')
    private readonly config: ImaggaConfig,
  ) {}

  private async downloadImage(url: string): Promise<Buffer> {
    const response = await lastValueFrom(
      this.httpService.get(url, { responseType: 'arraybuffer' }),
    );
    return Buffer.from(response.data);
  }

  private async createTempFile(imageBuffer: Buffer): Promise<string> {
    const tempFile = `temp-${Date.now()}.jpg`;
    fs.writeFileSync(tempFile, imageBuffer);
    return tempFile;
  }

  private async uploadToContent(imagePath: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));

    const response = await lastValueFrom(
      this.httpService.post(`${this.config.endpoint}/content`, formData, {
        auth: {
          username: this.config.apiKey,
          password: this.config.apiSecret,
        },
        headers: formData.getHeaders(),
      }),
    );

    return response.data.result.uploaded[0].id;
  }

  private async addImageToIndex(contentId: string): Promise<void> {
    await lastValueFrom(
      this.httpService.post(
        `${this.config.endpoint}/similar-images/v2/indexes/${this.config.indexName}/images`,
        null,
        {
          auth: {
            username: this.config.apiKey,
            password: this.config.apiSecret,
          },
          params: {
            content: contentId,
            category: this.config.categorizer,
          },
        },
      ),
    );
  }

  async uploadImagesToIndex(
    image1Url: string,
    image2Url: string,
  ): Promise<void> {
    const [image1Buffer, image2Buffer] = await Promise.all([
      this.downloadImage(image1Url),
      this.downloadImage(image2Url),
    ]);

    const [tempFile1, tempFile2] = await Promise.all([
      this.createTempFile(image1Buffer),
      this.createTempFile(image2Buffer),
    ]);

    try {
      const [contentId1, contentId2] = await Promise.all([
        this.uploadToContent(tempFile1),
        this.uploadToContent(tempFile2),
      ]);

      await Promise.all([
        this.addImageToIndex(contentId1),
        this.addImageToIndex(contentId2),
      ]);
    } finally {
      [tempFile1, tempFile2].forEach((file) => fs.unlinkSync(file));
    }
  }

  async searchSimilarImages(queryImageUrl: string): Promise<any> {
    const imageBuffer = await this.downloadImage(queryImageUrl);
    const tempFile = await this.createTempFile(imageBuffer);

    try {
      const formData = new FormData();
      formData.append('image', fs.createReadStream(tempFile));

      const response = await lastValueFrom(
        this.httpService.post(
          `${this.config.endpoint}/similar-images/v2/indexes/${this.config.indexName}/search`,
          formData,
          {
            auth: {
              username: this.config.apiKey,
              password: this.config.apiSecret,
            },
            headers: formData.getHeaders(),
            params: {
              category: this.config.categorizer,
            },
          },
        ),
      );

      return response.data.result;
    } finally {
      fs.unlinkSync(tempFile);
    }
  }
}
