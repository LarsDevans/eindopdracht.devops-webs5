import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { ActionResult, CreateSubmissionDto } from '@app/types';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploadService } from '@app/imgbb';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    private readonly imgbbService: ImageUploadService,
  ) {}

  async create(
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<ActionResult> {
    const imageUrl = await this.imgbbService.uploadBase64Image(
      createSubmissionDto.imageBuffer,
    );

    const submission = this.submissionRepository.create({
      uuid: uuidv4(),
      targetUuid: createSubmissionDto.targetUuid,
      imageUrl,
      ownerUuid: createSubmissionDto.ownerUuid,
    });
    await this.submissionRepository.save(submission);

    return {
      success: true,
      reason: `Submission ${submission.uuid} successfully created.`,
      data: submission,
    };
  }

  async findOne(uuid: string): Promise<ActionResult> {
    const submissionResult = await this.submissionRepository.findOneBy({
      uuid,
    });

    return {
      success: submissionResult != null,
      reason: '',
      data: submissionResult || null,
    };
  }

  async findByTarget(uuid: string): Promise<ActionResult> {
    return {
      success: true,
      reason: '',
      data: await this.submissionRepository.find({
        where: { targetUuid: uuid },
      }),
    };
  }

  async remove(uuid: string): Promise<ActionResult> {
    await this.submissionRepository.delete({ uuid });

    return {
      success: true,
      reason: `Submission ${uuid} successfully removed.`,
      data: null,
    };
  }
}
