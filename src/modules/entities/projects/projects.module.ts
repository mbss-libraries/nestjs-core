import { forwardRef, Module } from '@nestjs/common';
import { LocationsModule } from '../locations/locations.module';
import { ProjectsService } from './projects.service';

@Module({
	imports: [forwardRef(() => LocationsModule)],
	providers: [ProjectsService],
	exports: [ProjectsService],
})
export class ProjectsModule {}
