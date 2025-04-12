import { Module } from '@nestjs/common';
import { ImageUploadService } from './imgbb.service';

@Module({
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class ImgbbModule {}
