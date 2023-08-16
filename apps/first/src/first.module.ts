import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { RABBIT_OPTIONS, TASK_QUEUE } from '@app/common';
import { FirstController } from './first.controller';
import { FirstService } from './first.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({level: 'debug'}),
        new winston.transports.File({
          dirname: path.join(__dirname, '../../../log'), 
          filename: 'first_microservice.log', 
          level: 'debug',
        }),
      ],
    }),
    ClientsModule.registerAsync([
      {
        name: 'TASK_SERVICE',
        useFactory: (configService: ConfigService) =>
          RABBIT_OPTIONS(TASK_QUEUE, configService.get<string>('LAUNCHED_FROM')),
        inject: [ConfigService],
      },
    ]),
  ],
  
  controllers: [FirstController],
  providers: [FirstService],
})
export class FirstModule {}
