import { KAFKA_CLIENT_NAME, KafkaService } from '@app/kafka';
import { ActionResult } from '@app/types';
import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import { Clock } from './entities/clock.entity';
import { CreateClockDto } from './dto/create-clock.dto';

@Injectable()
export class ClockService {
  constructor(
    @InjectRepository(Clock)
    private readonly clockRepository: Repository<Clock>,
    @Inject(KAFKA_CLIENT_NAME) private readonly kafkaService: KafkaService,
  ) {}

  async create(createClockDto: CreateClockDto): Promise<ActionResult> {
    const clock = this.clockRepository.create(createClockDto);
    await this.clockRepository.save(clock);

    return {
      success: true,
      reason: `Clock scheduled for ${clock.targetUuid} at ${clock.deadlineUtc.toISOString()}`,
      data: clock,
    };
  }

  @Cron('*/30 * * * * *') // Every 30 seconds
  async processDueJobs() {
    const now = new Date();

    console.log('Current time:', now.toISOString());

    const dueJobs = await this.clockRepository.find({
      where: { deadlineUtc: LessThan(now), processed: false },
    });

    if (dueJobs.length === 0) {
      return console.log('No jobs due for processing.');
    }

    for (const job of dueJobs) {
      job.processed = true;
      await this.clockRepository.save(job);

      this.kafkaService.emit('target.completed', {
        topic: 'target.completed',
        timestamp: new Date().toISOString(),
        data: job.targetUuid,
      });

      console.log('Processed job with target UUID:', job.targetUuid);
    }
  }
}
