import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('mail')
@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns hello',
  })
  @ApiOperation({
    summary: 'Hello',
    description: 'Returns hello',
  })
  getHello(): string {
    return this.mailService.getHello();
  }
}
