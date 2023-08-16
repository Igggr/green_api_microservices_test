import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FirstService {
  constructor(@Inject('TASK_SERVICE') private client: ClientProxy) { }

  async ping() {
    const data = 'PING';
    console.log('Первый сервис отправил сообщение', data);

    // client.send - Observable, превращаем в Promise
    const reply = await firstValueFrom(
      this.client.send({ cmd: 'TASK' }, { data })
    );
    console.log('Первый сервис получил ответ', reply);
    return reply;
  }
}
