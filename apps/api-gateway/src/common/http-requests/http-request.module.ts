import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestService } from './http-request.service';
import { AuthorizedRequestService } from './authorized-request.service';

@Module({
  imports: [HttpModule],
  providers: [HttpRequestService, AuthorizedRequestService],
  exports: [HttpRequestService, AuthorizedRequestService],
})
export class HttpRequestModule {}
