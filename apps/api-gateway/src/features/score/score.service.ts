import { Injectable } from '@nestjs/common';
import { SCORE_SERVICE_URL } from '../../config/api.constants';
import { AuthorizedRequestService } from '../../common/http-requests/authorized-request.service';

@Injectable()
export class ScoreService {
  constructor(
    private readonly authorizedRequestService: AuthorizedRequestService,
  ) {}

  async getAllScores(userUuid: string, targetUuid: string) {
    try {
      return await this.authorizedRequestService.sendAuthorizedRequest<string>(
        'score',
        'GET',
        `${SCORE_SERVICE_URL}/all`,
        { userUuid, targetUuid },
      );
    } catch (error) {
      console.error('Error fetching scores:', error);
      return error.message;
    }
  }
}
