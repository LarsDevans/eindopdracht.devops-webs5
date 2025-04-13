import { TopicPayload } from '@app/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from '../mail.service';
import { UsersService } from '../users/users.service';

@Controller()
export class ScoreController {
  constructor(
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern('target.winner')
  async targetWinner(@Payload() topicPayload: TopicPayload) {
    const { targetUuid, winnerUuid, score } = topicPayload.data;

    const user = await this.usersService.findOne(winnerUuid);

    this.mailService.dispatchWinnerEmail(user.email, targetUuid, score);
  }
}
