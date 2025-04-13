import { Injectable } from '@nestjs/common';
import { SUBMISSION_SERVICE_URL } from '../../config/api.constants';
import { AuthorizedRequestService } from '../../common/http-requests/authorized-request.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class Submission {
  constructor(
    private readonly authorizedRequestService: AuthorizedRequestService,
  ) {}

  async getAll(userUuid: string, targetUuid: string) {
    try {
      return await this.authorizedRequestService.sendAuthorizedRequest<string>(
        'submission',
        'GET',
        `${SUBMISSION_SERVICE_URL}/all`,
        { userUuid, targetUuid },
      );
    } catch (error) {
      console.error('Error:', error);
      return error.message;
    }
  }

  async create(createSubmissionDto: CreateSubmissionDto) {
    try {
      return await this.authorizedRequestService.sendAuthorizedRequest<string>(
        'submission',
        'POST',
        SUBMISSION_SERVICE_URL,
        createSubmissionDto,
      );
    } catch (error) {
      console.error('Error:', error);
      return error.message;
    }
  }

  async remove(uuid: string, userUuid: string) {
    try {
      return await this.authorizedRequestService.sendAuthorizedRequest<string>(
        'submission',
        'DELETE',
        SUBMISSION_SERVICE_URL,
        { uuid, userUuid },
      );
    } catch (error) {
      console.error('Error:', error);
      return error.message;
    }
  }
}
