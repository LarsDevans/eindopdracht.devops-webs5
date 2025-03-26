import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScoreServiceController } from './score-service.controller';
import { ScoreServiceService } from './score-service.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_SCORE_DB,
    }),
  ],
  controllers: [ScoreServiceController],
  providers: [ScoreServiceService],
})
export class ScoreServiceModule {}
