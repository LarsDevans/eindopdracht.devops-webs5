import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TargetServiceController } from './target-service.controller';
import { TargetServiceService } from './target-service.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_TARGET_DB,
    }),
  ],
  controllers: [TargetServiceController],
  providers: [TargetServiceService],
})
export class TargetServiceModule {}
