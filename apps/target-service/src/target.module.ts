import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Target } from './entities/target.entity';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';
import { ApiKeyGuard } from '@app/types';
import { APP_GUARD } from '@nestjs/core';
import { ImgbbModule } from '@app/imgbb';

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
    ImgbbModule,
  ],
  controllers: [TargetController],
  providers: [
    TargetService,
    {
      provide: APP_GUARD,
      useFactory: () => {
        return new ApiKeyGuard(
          process.env.API_JWT_SECRET_TARGET,
          process.env.API_KEY_TARGET,
        );
      },
    },
  ],
})
export class TargetModule {}
