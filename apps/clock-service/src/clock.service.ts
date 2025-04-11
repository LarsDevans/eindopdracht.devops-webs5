import { ActionResult } from '@app/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clock } from './entities/clock.entity';
import { CreateClockDto } from './dto/create-clock.dto';

@Injectable()
export class ClockService {
  constructor(
    @InjectRepository(Clock)
    private readonly clockRepository: Repository<Clock>,
  ) {}

  async create(createClockDto: CreateClockDto): Promise<ActionResult> {
    const clock = this.clockRepository.create(createClockDto);
    await this.clockRepository.save(clock);

    return {
      success: true,
      reason: `Clock ${clock.targetUuid} successfully created`,
      data: clock,
    };
  }
}
