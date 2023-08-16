import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SUBMIT_TASK, Task } from '@app/common';

@Controller()
export class SecondController {

  @MessagePattern({ cmd: SUBMIT_TASK })
  executeTask(
    @Payload() payload: Pick<Task, 'operation' | 'left' | 'right'>,
    @Ctx() context: RmqContext) {

    console.log('Second microservice recieved message', payload);
    const task = Task.parse(payload);
    const response = task.execute();
    console.log('Second microservice replied with', response);
    return response;
  }
}
