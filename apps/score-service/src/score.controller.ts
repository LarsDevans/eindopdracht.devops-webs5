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

      const result = await this.imaggaService.getSimilarity(image1, image2);

      return {
        message: 'Afstand tussen de afbeeldingen: ' + result,
        distance: result,
      };
    } catch (error) {
      console.error('Error processing images:', error);
      return {
        message: 'Fout bij verwerking: ' + error.message,
      };
    }
  }
}
