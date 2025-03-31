import { Controller, Get } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';
import { ApiBasicAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags("Mail")
@ApiBasicAuth()
export class MailServiceController {
  constructor(private readonly mailServiceService: MailServiceService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns hello',
  })
  @ApiOperation({
    summary: "Hello",
    description: "Returns hello",
  })
  getHello(): string {
    return this.mailServiceService.getHello();
  }
}
