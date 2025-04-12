import { ActionResult } from '@app/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTargetDto } from './dto/create-target-dto';
import { Target } from './entity/target.entity';

@Injectable()
export class TargetsService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
  ) {}

  async create(createTargetDto: CreateTargetDto): Promise<ActionResult> {
    const target = this.targetRepository.create(createTargetDto);
    await this.targetRepository.save(target);

    return {
      success: true,
      reason: `Target ${target.uuid} successfully added with image URL ${target.imageUrl}.`,
      data: target,
    };
  }

  async findOne(uuid: string): Promise<Target | null> {
    return await this.targetRepository.findOneBy({ uuid });
  }
}
