import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailService } from './mail.service';
import { UsersModule } from './users/users.module';
import { TargetsController } from './targets/targets.controller';
import { TargetsModule } from './targets/targets.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { PrometheusModule } from '@app/prometheus';
import { Submission } from './submissions/entities/submission.entity';
import { Target } from './targets/entity/target.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_MAIL_DB,
      entities: [Submission, Target, User],
      synchronize: true,
    }),
    KafkaModule.register({ groupId: 'mail-consumer' }),
    UsersModule,
    TargetsModule,
    SubmissionsModule,
    PrometheusModule,
  ],
  providers: [MailService],
  controllers: [TargetsController],
})
export class MailModule {}
