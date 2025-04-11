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

    console.log(
      `Target ${target.uuid} successfully created for owner ${target.ownerUuid}.`,
    );
    return {
      success: true,
      reason: `Target ${target.uuid} successfully created for owner ${target.ownerUuid}.`,
      data: target,
    };
  }

  async findOne(uuid: string): Promise<Target | null> {
    return await this.targetRepository.findOneBy({ uuid });
  }
}
