import { IBaseService, loadRelationIds, mapChildrenIdsFromModel, TModelNames } from '@helpers';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LocationsService } from '../locations/locations.service';
import { App } from './app.entity';

@Injectable()
export class AppsService implements IBaseService<App> {
	constructor(@Inject(forwardRef(() => LocationsService)) private locationsService: LocationsService) {}

	available(authUserId: string): Promise<App[]> {
		throw new Error('Method not implemented.');
	}
	async findOneById(id: string | undefined): Promise<App | undefined> {
		return await App.findOne({ id }, loadRelationIds);
	}
	async findByIds(ids: string[]): Promise<App[]> {
		return await App.findByIds(ids, loadRelationIds);
	}
	async loadExtendedRelations(value: App | App[], exclude?: TModelNames[]) {
		const locationIds = Array.isArray(value) ? mapChildrenIdsFromModel(value, 'locationIds') : value.locationIds;

		const locations = !exclude?.includes('Location') ? await this.locationsService.findByIds(locationIds ?? []) : [];

		return { Location: locations };
	}
}
