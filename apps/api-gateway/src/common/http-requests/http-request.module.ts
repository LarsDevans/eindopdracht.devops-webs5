import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestService } from './http-request.service';

@Module({
  imports: [HttpModule],
  providers: [HttpRequestService],
  exports: [HttpRequestService],
})
export class HttpRequestModule {}
