import { Controller, Get, Res } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { Response } from 'express';
import { Public } from '@app/auth';

@Controller('metrics')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Public()
  @Get()
  async getMetrics(@Res() res: Response) {
    const metrics = await this.prometheusService.getMetrics();
    res.setHeader('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
