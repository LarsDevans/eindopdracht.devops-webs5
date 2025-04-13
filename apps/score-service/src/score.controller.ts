import { Body, Controller, Post } from '@nestjs/common';
import { ImaggaService } from '@app/imagga';
import { ApiBody } from '@nestjs/swagger';
import { CompareImagesDto } from './dto/compare-images.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TopicPayload } from '@app/types';
import { TargetsService } from './targets/targets.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly imaggaService: ImaggaService,
    private readonly targetService: TargetsService,
  ) {}

  @MessagePattern('submission.created')
  async calculateScore(@Payload() topicPayload: TopicPayload) {
    const { imageUrl, targetUuid, uuid } = topicPayload.data;
    if (!imageUrl || !targetUuid || !uuid) {
      return console.error('Incomplete payload:', topicPayload.data);
    }

    const target = await this.targetService.findOne(targetUuid);
    if (!target) {
      console.error('Target not found:', targetUuid);
      return;
    }

    const compareImagesDto: CompareImagesDto = {
      targetImageUrl: target.imageUrl,
      submissionImageUrl: imageUrl,
    };
    const result = await this.processImages(compareImagesDto);

    // Bereken de score op basis van de afstand
  }

  private async processImages(@Body() compareImagesDto: CompareImagesDto) {
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
