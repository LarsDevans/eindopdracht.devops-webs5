import { ActionResult } from '@app/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Target } from './entities/target.entity';
import { CreateTargetDto } from './dto/create-target.dto';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
  ) {}

  async create(createTargetDto: CreateTargetDto): Promise<ActionResult> {
    const target = this.targetRepository.create({
      uuid: uuidv4(),
      ...createTargetDto,
    });
    await this.targetRepository.save(target);

    return {
      success: true,
      reason: `Target ${target.uuid} successfully created.`,
      data: target,
    };
  }

  async findAllByCoordinates(lat: string, lon: string): Promise<ActionResult> {
    const targets = await this.targetRepository.findBy({
      nearbyLatitude: lat,
      nearbyLongitude: lon,
    });
    return { success: true, reason: 'All targets found.', data: targets };
  }

  async findAll(): Promise<ActionResult> {
    const targets = await this.targetRepository.find();
    return { success: true, reason: 'All targets found.', data: targets };
  }
}
