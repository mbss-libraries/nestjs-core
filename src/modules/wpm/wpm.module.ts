import { Module } from '@nestjs/common';
import { WpmController } from './wpm.controller';

@Module({
  controllers: [WpmController]
})
export class WpmModule {}
