import { Body, Controller, Post } from '@nestjs/common';
import { ImaggaService } from '@app/imagga';
import { ApiBody } from '@nestjs/swagger';
import { CompareImagesDto } from './dto/compare-images.dto';

@Controller('api')
export class AppController {
  constructor(private readonly imaggaService: ImaggaService) {}

  @Post('process-images')
  @ApiBody({ type: CompareImagesDto })
  async processImages(@Body() compareImagesDto: CompareImagesDto) {
    try {
      const image1 = compareImagesDto.targetImageUrl;
      const image2 = compareImagesDto.submissionImageUrl;

      // Upload beide afbeeldingen naar de index
      await this.imaggaService.uploadImagesToIndex(image1, image2);

      // Zoek vergelijkbare afbeeldingen met de eerste afbeelding
      const results = await this.imaggaService.searchSimilarImages(image1);

      return {
        message: 'Verwerking voltooid',
        results,
      };
    } catch (error) {
      console.error('Error processing images:', error);
      return {
        message: 'Fout bij verwerking: ' + error.message,
      };
    }
  }
}
