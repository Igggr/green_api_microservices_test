import { Module } from '@nestjs/common';
import { SecondController } from './second.controller';

@Module({
  imports: [],
  controllers: [SecondController],
  providers: [],
})
export class SecondModule {}
