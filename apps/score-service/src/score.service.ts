import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Submission } from './submissions/entity/submission.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async calculateScore(
    distance: number, // 0 = perfect match, >0 = slechter
    submissionTime: Date,
    targetTime: Date,
  ): Promise<number> {
    const maxScore = 100;

    const visualScore = Math.max(0, 1 - distance); // tussen 0 en 1

    const timeDiffSeconds =
      (submissionTime.getTime() - targetTime.getTime()) / 1000;

    const maxAllowedSeconds = 3600;
    const timeScore = Math.max(0, 1 - timeDiffSeconds / maxAllowedSeconds); // tussen 0 en 1

    const finalScore = (0.7 * visualScore + 0.3 * timeScore) * maxScore;

    return Math.round(finalScore);
  }

  findAll(ownerUuid: string): Promise<Submission[] | null> {
    return this.submissionRepository.find({
      where: { ownerUuid },
    });
  }
}
