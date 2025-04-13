import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { TargetsModule } from './targets/targets.module';
import { KafkaModule } from '@app/kafka';
import { Submission } from './entities/submission.entity';
import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from '@app/auth';
import { ImgbbModule } from '@app/imgbb';
import { PrometheusModule } from '@app/prometheus';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_SUBMISSION_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Submission]),
    KafkaModule.register({ groupId: 'submission-consumer' }),
    TargetsModule,
    ImgbbModule,
    PrometheusModule,
  ],
  controllers: [SubmissionController],
  providers: [
    SubmissionService,
    {
      provide: 'APP_GUARD',
      useFactory: (reflector: Reflector) => {
        return new ApiKeyGuard(
          process.env.API_JWT_SECRET_SUBMISSION,
          process.env.API_KEY_SUBMISSION,
          reflector,
        );
      },
      inject: [Reflector],
    },
  ],
  exports: [SubmissionService],
})
export class SubmissionModule {}
