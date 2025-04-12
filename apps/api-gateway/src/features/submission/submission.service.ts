import { Injectable } from '@nestjs/common';
import { SUBMISSION_SERVICE_URL } from '../../config/api.constants';
import { AuthorizedRequestService } from '../../common/http-requests/authorized-request.service';

@Injectable()
export class SubmissionService {
  constructor(
    private readonly authorizedRequestService: AuthorizedRequestService,
  ) {}

  async getHello(): Promise<string> {
    try {
      return await this.authorizedRequestService.sendAuthorizedRequest<string>(
        'submission',
        'GET',
        SUBMISSION_SERVICE_URL,
      );
    } catch (error) {
      console.error('Error getting hello:', error);
      return error.message;
    }
  }
}
