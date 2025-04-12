import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from '@app/types';
import { TARGET_SERVICE_URL } from '../../config/api.constants';
import { AuthorizedRequestService } from '../../common/http-requests/authorized-request.service';

@Injectable()
export class TargetService {
  constructor(
    private readonly authorizedRequestService: AuthorizedRequestService,
  ) {}

  async create(createTargetDto: CreateTargetDto): Promise<string> {
    try {
      return await this.authorizedRequestService.sendAuthorizedRequest<string>(
        'target',
        'POST',
        TARGET_SERVICE_URL,
        createTargetDto,
      );
    } catch (error) {
      console.error('Error creating target:', error);
      return error.message;
    }
  }
}
