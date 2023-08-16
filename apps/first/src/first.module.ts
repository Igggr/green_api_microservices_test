import { Module } from '@nestjs/common';
import { FirstController } from './first.controller';
import { FirstService } from './first.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // кому ОТПРАВЛЯТЬ сообщения
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'task_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  
  controllers: [FirstController],
  providers: [FirstService],
})
export class FirstModule {}
