import { Task, SUBMIT_TASK } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FirstService {
  constructor(
    @Inject('TASK_SERVICE')
    private client: ClientProxy,
    @Inject('winston')
    private readonly logger: Logger,
  ) { }

  async ping(taskParam: string) {
    const task = Task.formTask(taskParam);
    this.logger.debug('Первый сервис отправил сообщение', task);

    // client.send - Observable, превращаем в Promise
    const reply = await firstValueFrom(
      this.client.send({ cmd: SUBMIT_TASK }, task)
    );
    this.logger.debug('Первый сервис получил ответ', reply);
    return reply;
  }

}