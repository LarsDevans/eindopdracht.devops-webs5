import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubmissionServiceController } from './submission-service.controller';
import { SubmissionServiceService } from './submission-service.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_SUBMISSION_DB,
    }),
  ],
  controllers: [SubmissionServiceController],
  providers: [SubmissionServiceService],
})
export class SubmissionServiceModule {}
