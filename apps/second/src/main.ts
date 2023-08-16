import { NestFactory } from '@nestjs/core';
import { SecondModule } from './second.module';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { TASK_QUEUE } from '@app/common/rabbit/queues';
import { RABBIT_OPTIONS } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(SecondModule, 
    // от кого получать сообщения
    RABBIT_OPTIONS(TASK_QUEUE, process.env.LAUNCHED_FROM),
  );

  // не реагирует на http-запросы. единственная цель - отвечать на сообщения в rabbit
  await app.listen();

}
bootstrap();
