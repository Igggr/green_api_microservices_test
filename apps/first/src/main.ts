import { NestFactory } from '@nestjs/core';
import { FirstModule } from './first.module';
import { RmqOptions } from '@nestjs/microservices';
import { RABBIT_OPTIONS, TASK_QUEUE } from '@app/common';

async function bootstrap() {
  // const app = await NestFactory.create(FirstModule);

  // app.connectMicroservice<RmqOptions>(
  //   RABBIT_OPTIONS(TASK_QUEUE, process.env.LAUNCHED_FROM)
  // )
  // await app.startAllMicroservices();
  // await app.listen(3000);
  
  const app = await NestFactory.create(FirstModule);

  // первый микросервис просто отправляет сообщения в очередь
  // и ждет ответ. Сообщений "по чужой инициативе" - не будет
  // => app.connectMicroservice(transport, options) не нужен

  // отвечает на http-запросы
  await app.listen(3000);
}
bootstrap();
