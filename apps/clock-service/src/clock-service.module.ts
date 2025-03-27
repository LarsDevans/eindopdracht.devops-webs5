import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockServiceController } from './clock-service.controller';
import { ClockServiceService } from './clock-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-service',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_CLOCK_DB,
    }),
  ],
  controllers: [ClockServiceController],
  providers: [ClockServiceService],
})
export class ClockServiceModule {}
