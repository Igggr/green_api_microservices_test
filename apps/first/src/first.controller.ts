import { Controller, Get, Param } from '@nestjs/common';
import { FirstService } from './first.service';

@Controller()
export class FirstController {
  constructor(private readonly firstService: FirstService) {}

  @Get('/:task')
  async submitTask(@Param('task') task: string) {
    const reply = await this.firstService.ping(task);
    return reply;
  }
}
