import { Test, TestingModule } from '@nestjs/testing';
import { ScoreServiceController } from './score-service.controller';
import { ScoreServiceService } from './score-service.service';

describe('ScoreServiceController', () => {
  let scoreServiceController: ScoreServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScoreServiceController],
      providers: [ScoreServiceService],
    }).compile();

    scoreServiceController = app.get<ScoreServiceController>(
      ScoreServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(scoreServiceController.getHello()).toBe('Hello World!');
    });
  });
});
