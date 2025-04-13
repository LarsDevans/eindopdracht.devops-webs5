import { Body, Controller, Get, Inject, Query } from '@nestjs/common';
import { ImaggaService } from '@app/imagga';
import { CompareImagesDto } from './dto/compare-images.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TopicPayload } from '@app/types';
import { TargetsService } from './targets/targets.service';
import { ScoreService } from './score.service';
import { SubmissionsService } from './submissions/submissions.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { KAFKA_CLIENT_NAME, KafkaService } from '@app/kafka';

@Controller('api')
export class ScoreController {
  constructor(
    private readonly imaggaService: ImaggaService,
    private readonly targetService: TargetsService,
    private readonly scoreService: ScoreService,
    private readonly submissionService: SubmissionsService,
    @Inject(KAFKA_CLIENT_NAME)
    private readonly kafkaService: KafkaService,
  ) {}

  @MessagePattern('submission.created')
  async calculateScore(@Payload() topicPayload: TopicPayload) {
    const { imageUrl, targetUuid, uuid, ownerUuid } = topicPayload.data;
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
    if (result.distance === undefined) {
      return console.error('Error processing images:', result);
    }

    const submissionTime = topicPayload.timestamp;
    const targetTime = target.createdAt;

    const score = await this.scoreService.calculateScore(
      result.distance,
      new Date(submissionTime),
      new Date(targetTime),
    );

    this.submissionService.create({
      uuid,
      targetUuid,
      score,
      ownerUuid,
    });

    console.log(
      `Submission ${uuid} of user ${ownerUuid} for target ${targetUuid} processed. Score: ${score}`,
    );
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

  @MessagePattern('target.completed')
  async targetCompleted(@Payload() topicPayload: TopicPayload) {
    const { targetUuid } = topicPayload.data;
    if (!targetUuid) {
      return console.error('Incomplete payload:', topicPayload.data);
    }

    const submissionWinner =
      await this.submissionService.findWinner(targetUuid);
    if (!submissionWinner) {
      return console.error('No winner found for target:', targetUuid);
    }

    const winnerUuid = submissionWinner.ownerUuid;
    this.kafkaService.emit('target.winner', {
      topic: 'target.winner',
      timestamp: Date(),
      data: {
        targetUuid,
        winnerUuid,
        score: submissionWinner.score,
      },
    });
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all scores' })
  @ApiResponse({ status: 200, description: 'All scores' })
  async getAllScores(
    @Query('userUuid') userUuid: string,
    @Query('targetUuid') targetUuid: string,
  ) {
    const target = await this.targetService.findOne(targetUuid);
    if (!target) {
      return console.error('Target not found:', targetUuid);
    }
    if (target.ownerUuid !== userUuid) {
      return console.error('User is not owner of target:', userUuid);
    }

    return this.submissionService.findAll(targetUuid);
  }
}
