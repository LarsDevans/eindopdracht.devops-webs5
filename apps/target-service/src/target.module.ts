import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Target } from './entities/target.entity';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_TARGET_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Target]),
    KafkaModule.register({ groupId: 'target-consumer' }),
  ],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
