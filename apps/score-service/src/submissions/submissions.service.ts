import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entity/submission.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  create(createSubmissionDto: CreateSubmissionDto) {
    const submission = this.submissionRepository.create(createSubmissionDto);
    return this.submissionRepository.save(submission);
  }

  findAll(targetUuid: string) {
    return this.submissionRepository.find({
      where: { targetUuid },
    });
  }

  async findOne(uuid: string) {
    return await this.submissionRepository.findOneBy({ uuid });
  }

  async remove(uuid: string) {
    const submission = await this.findOne(uuid);
    if (submission) {
      this.submissionRepository.remove(submission);
      return {
        success: true,
        reason: `Submission ${uuid} successfully removed.`,
      };
    }
    return {
      success: false,
      reason: `Submission ${uuid} not found.`,
    };
  }
}
