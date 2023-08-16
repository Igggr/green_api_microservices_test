import { Task } from '@app/common';
import { SUBMIT_TASK } from '@app/common/messages';
import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FirstService {
  constructor(@Inject('TASK_SERVICE') private client: ClientProxy) { }

  async ping(taskParam: string) {
    const task = Task.formTask(taskParam);
    console.log('Первый сервис отправил сообщение', task);

    // client.send - Observable, превращаем в Promise
    const reply = await firstValueFrom(
      this.client.send({ cmd: SUBMIT_TASK }, task)
    );
    console.log('Первый сервис получил ответ', reply);
    return reply;
  }


}