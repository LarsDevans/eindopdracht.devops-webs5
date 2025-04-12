import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ActionResult } from '@app/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async create(
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<ActionResult> {
    const submission = this.submissionRepository.create({
      uuid: uuidv4(),
      ...createSubmissionDto,
    });
    await this.submissionRepository.save(submission);

    return {
      success: true,
      reason: `Submission ${submission.uuid} successfully created.`,
      data: submission,
    };
  }
}
