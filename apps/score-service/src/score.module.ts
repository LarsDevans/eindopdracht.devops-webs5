import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScoreService } from './score.service';
import { KafkaModule } from '@app/kafka';
import { TargetsModule } from './targets/targets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_SCORE_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    KafkaModule.register({ groupId: 'score-consumer' }),
    TargetsModule,
  ],
  providers: [ScoreService],
})
export class ScoreModule {}
