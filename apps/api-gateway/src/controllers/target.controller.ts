import { Controller, Get } from '@nestjs/common';
import { TargetService } from '../services/target.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Get()
  @ApiBearerAuth('access-token')
  async getHello() {
    return this.targetService.getHello();
  }
}
