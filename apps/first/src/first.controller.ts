import { Controller, Get } from '@nestjs/common';
import { FirstService } from './first.service';

@Controller()
export class FirstController {
  constructor(private readonly firstService: FirstService) {}

  @Get('')
  async getHello() {
    const reply = await this.firstService.ping();
    return reply;
  }
}
