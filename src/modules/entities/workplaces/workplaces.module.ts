import { Module } from '@nestjs/common';
import { WorkplacesService } from './workplaces.service';

@Module({
  providers: [WorkplacesService]
})
export class WorkplacesModule {}
