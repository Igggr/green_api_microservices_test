import { NestFactory } from '@nestjs/core';
import { FirstModule } from './first.module';

async function bootstrap() {
  const app = await NestFactory.create(FirstModule);

  // первый микросервис просто отправляет сообщения в очередь
  // и ждет ответ. Сообщений "по чужой инициативе" - не будет
  // => app.connectMicroservice(transport, options) не нужен

  // отвечает на http-запросы
  await app.listen(3000);
}
bootstrap();
