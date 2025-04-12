import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/target.dto';
import { ActionResult } from '@app/types';
import { Target } from './entities/target.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TargetsService {
  constructor(
    @InjectRepository(Target)
    private readonly targetsRepository: Repository<Target>,
  ) {}

  async create(createTargetDto: CreateTargetDto): Promise<ActionResult> {
    const target = this.targetsRepository.create(createTargetDto);
    await this.targetsRepository.save(target);

    return {
      success: true,
      reason: `Target ${target.uuid} is now OPEN for submissions.`,
      data: target,
    };
  }

  async close(targetUuid: string): Promise<ActionResult> {
    const target = await this.targetsRepository.findOneBy({ uuid: targetUuid });
    target.closedForSubmission = true;

    this.targetsRepository.save(target);

    return {
      success: true,
      reason: `Target ${targetUuid} is now CLOSED for submissions.`,
      data: null,
    };
  }

  async findOne(targetUuid: string): Promise<ActionResult> {
    const target = await this.targetsRepository.findOneBy({ uuid: targetUuid });
    return { success: target != null, reason: '', data: target || null };
  }
}
