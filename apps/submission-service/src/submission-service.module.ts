import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubmissionServiceController } from './submission-service.controller';
import { SubmissionServiceService } from './submission-service.service';
import { ApiKeyGuard } from '@app/types';

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
  providers: [
    SubmissionServiceService,
    {
      provide: 'APP_GUARD',
      useFactory: () => {
        return new ApiKeyGuard(
          process.env.API_JWT_SECRET_SUBMISSION,
          process.env.API_KEY_SUBMISSION,
        );
      },
    },
  ],
})
export class SubmissionServiceModule {}
