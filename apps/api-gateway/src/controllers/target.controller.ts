import { Controller, Get } from '@nestjs/common';
import { TargetService } from '../services/target.service';

@Controller('Target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Get()
  async testConnection() {
    return this.targetService.testConnection();
  }
}
