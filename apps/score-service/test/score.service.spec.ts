import { Test, TestingModule } from '@nestjs/testing';
import { ScoreService } from '../src/score.service';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreService],
    }).compile();

    service = module.get<ScoreService>(ScoreService);
  });

  it('should return 100 for perfect match and on-time submission', async () => {
    const distance = 0;
    const now = new Date();
    const score = await service.calculateScore(distance, now, now);
    expect(score).toBe(100);
  });

  it('should return a lower score for imperfect match and late submission', async () => {
    const distance = 0.3; // visualScore = 0.7
    const targetTime = new Date();
    const submissionTime = new Date(targetTime.getTime() + 1800 * 1000); // 30 mins late
    const score = await service.calculateScore(
      distance,
      submissionTime,
      targetTime,
    );
    expect(score).toBeLessThan(100);
  });

  it('should not go below 0', async () => {
    const distance = 10; // very bad visual match
    const targetTime = new Date();
    const submissionTime = new Date(targetTime.getTime() + 7200 * 1000); // 2 hours late
    const score = await service.calculateScore(
      distance,
      submissionTime,
      targetTime,
    );
    expect(score).toBe(0);
  });
});
