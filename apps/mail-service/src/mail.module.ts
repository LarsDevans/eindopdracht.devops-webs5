import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailService } from './mail.service';
import { UsersModule } from './users/users.module';
import { TargetsController } from './targets/targets.controller';
import { TargetsModule } from './targets/targets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_MAIL_DB,
      autoLoadEntities: true,
    }),
    KafkaModule.register({ groupId: 'mail-consumer' }),
    UsersModule,
    TargetsModule,
  ],
  providers: [MailService],
  controllers: [TargetsController],
})
export class MailModule {}
