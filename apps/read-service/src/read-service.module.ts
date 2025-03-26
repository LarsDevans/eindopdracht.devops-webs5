import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReadServiceController } from './read-service.controller';
import { ReadServiceService } from './read-service.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_READ_DB,
    }),
  ],
  controllers: [ReadServiceController],
  providers: [ReadServiceService],
})
export class ReadServiceModule {}
