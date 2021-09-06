import { forwardRef, Module } from '@nestjs/common';
import { LocationsModule } from '../locations/locations.module';
import { AppsService } from './apps.service';

@Module({
	imports: [forwardRef(() => LocationsModule)],
	providers: [AppsService],
	exports: [AppsService],
})
export class AppsModule {}
