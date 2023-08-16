import { Controller, Inject, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SUBMIT_TASK, Task, ack } from '@app/common';

@Controller()
export class SecondController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger
  ) {
  }

  @MessagePattern({ cmd: SUBMIT_TASK })
  executeTask(
    @Payload() payload: Pick<Task, 'operation' | 'left' | 'right'>,
    @Ctx() context: RmqContext) {

    this.logger.debug('Second microservice recieved message', payload);
    // ack(context);

    const task = Task.parse(payload);
    const response = task.execute();
    this.logger.debug(`Second microservice replied with ${response}`);
    return response;
  }
}
