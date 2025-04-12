import { ActionResult } from '@app/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Target } from './entities/target.entity';
import { CreateTargetDto } from '@app/types';
import { ImageUploadService } from '@app/imgbb';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
    private readonly imgbbService: ImageUploadService,
  ) {}

  async create(createTargetDto: CreateTargetDto): Promise<ActionResult> {
    const imageUrl = await this.imgbbService.uploadBase64Image(
      createTargetDto.imageBuffer,
    );

    const target = this.targetRepository.create({
      uuid: uuidv4(),
      imageUrl,
      durationHours: createTargetDto.durationHours,
      nearbyLatitude: createTargetDto.nearbyLatitude,
      nearbyLongitude: createTargetDto.nearbyLongitude,
      radiusMeters: createTargetDto.radiusMeters,
      ownerUuid: createTargetDto.ownerUuid,
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
