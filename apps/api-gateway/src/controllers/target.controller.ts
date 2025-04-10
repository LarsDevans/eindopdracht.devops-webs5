import { Controller, Get } from '@nestjs/common';
import { TargetService } from '../services/target.service';

@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Get()
  async getHello() {
    return this.targetService.getHello();
  }
}
