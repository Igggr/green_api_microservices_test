import { NestFactory } from '@nestjs/core';
import { SecondModule } from './second.module';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<RmqOptions>(SecondModule, {
    // от кого получать сообщения
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'task_queue',
      queueOptions: {
        durable: false
      },
    },

  });

  // не реагирует на http-запросы. единственная цель - отвечать на сообщения в rabbit
  await app.listen();

}
bootstrap();
