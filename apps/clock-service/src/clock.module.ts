import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';
import { Clock } from './entities/clock.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_CLOCK_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Clock]),
    KafkaModule.register({ groupId: 'clock-consumer' }),
  ],
  controllers: [ClockController],
  providers: [ClockService],
})
export class ClockModule {}
