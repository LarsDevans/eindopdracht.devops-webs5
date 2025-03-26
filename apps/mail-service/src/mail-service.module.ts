import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailServiceController } from './mail-service.controller';
import { MailServiceService } from './mail-service.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_MAIL_DB,
    }),
  ],
  controllers: [MailServiceController],
  providers: [MailServiceService],
})
export class MailServiceModule {}
