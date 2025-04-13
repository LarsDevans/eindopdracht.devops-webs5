import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionResult } from '@app/types';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async create(
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<ActionResult> {
    const submission = this.submissionRepository.create(createSubmissionDto);
    await this.submissionRepository.save(submission);

    console.log(
      `Submission ${submission.uuid} successfully created for ${submission.targetUuid} by owner ${submission.ownerUuid}.`,
    );
    return {
      success: true,
      reason: `Submission ${submission.uuid} successfully created for ${submission.targetUuid} by owner ${submission.ownerUuid}.`,
      data: submission,
    };
  }

  async findOne(uuid: string): Promise<Submission | null> {
    return await this.submissionRepository.findOneBy({ uuid });
  }
}
