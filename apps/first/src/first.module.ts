import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { RABBIT_OPTIONS, TASK_QUEUE } from '@app/common';
import { FirstController } from './first.controller';
import { FirstService } from './first.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    // кому ОТПРАВЛЯТЬ сообщения
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
