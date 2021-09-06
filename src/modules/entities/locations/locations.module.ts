import { forwardRef, Module } from '@nestjs/common';
import { AppsModule } from '../apps/apps.module';
import { ProjectsModule } from '../projects/projects.module';
import { LocationsService } from './locations.service';

@Module({
	imports: [forwardRef(() => AppsModule), forwardRef(() => ProjectsModule)],
	providers: [LocationsService],
	exports: [LocationsService],
})
export class LocationsModule {}
