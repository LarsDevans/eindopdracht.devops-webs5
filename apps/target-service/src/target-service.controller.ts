import { Controller, Get } from '@nestjs/common';
import { TargetServiceService } from './target-service.service';

@Controller()
export class TargetServiceController {
  constructor(private readonly targetServiceService: TargetServiceService) {}

  @Get()
  getHello(): string {
    return this.targetServiceService.getHello();
  }
}
