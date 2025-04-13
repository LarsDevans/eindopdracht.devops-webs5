import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScoreService } from './score.service';
import { KafkaModule } from '@app/kafka';
import { TargetsModule } from './targets/targets.module';
import { ImaggaModule } from '@app/imagga';
import { AppController } from './score.controller';
import { PrometheusModule } from '@app/prometheus';

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
    PrometheusModule,
    KafkaModule.register({ groupId: 'score-consumer' }),
    TargetsModule,
    ImaggaModule,
  ],
  controllers: [AppController],
  providers: [ScoreService],
})
export class ScoreModule {}
