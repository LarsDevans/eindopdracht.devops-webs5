import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_CLOCK_DB,
    }),
  ],
  controllers: [ClockController],
  providers: [ClockService],
})
export class ClockModule {}
