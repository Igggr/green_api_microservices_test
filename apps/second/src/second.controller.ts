import { Controller } from '@nestjs/common';
import { SecondService } from './second.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class SecondController {
  constructor(private readonly secondService: SecondService) {}

  @MessagePattern({ cmd: 'TASK' })
  accumulate(@Payload() payload: any, @Ctx() context: RmqContext) {

    console.log('Second microservice recieved message', payload);
    const response = 'PONG';
    console.log('Second microservice replied with', response);
    return response;
  }
}
