import { Module } from '@nestjs/common';
import { SecondController } from './second.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { RABBIT_OPTIONS, TASK_QUEUE } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'TASK_SERVICE',
        useFactory: (configService: ConfigService) =>
          RABBIT_OPTIONS(TASK_QUEUE, configService.get<string>('LAUNCHED_FROM')),
        inject: [ConfigService],
      },
    ]),  ],
  controllers: [SecondController],
  providers: [],
})
export class SecondModule {}
