import { Module } from '@nestjs/common';
import { ImaggaService } from './imagga.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { imaggaConfig } from './config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [
    ImaggaService,
    {
      provide: 'ImaggaConfig',
      useValue: imaggaConfig,
    },
  ],
  exports: [ImaggaService],
})
export class ImaggaModule {}
