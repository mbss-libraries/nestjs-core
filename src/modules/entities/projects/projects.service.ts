import { IBaseService, loadRelationIds, mapChildrenIdsFromModel, TModelNames } from '@helpers';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { LocationsService } from '../locations/locations.service';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService implements IBaseService<Project> {
	constructor(private locationsService: LocationsService) {}

	available(authUserId: string): Promise<Project[]> {
		throw new Error('Method not implemented.');
	}
	async findOneById(id: string | undefined): Promise<Project | undefined> {
		return await Project.findOne({ id }, loadRelationIds);
	}
	findByIds(ids: string[]): Promise<Project[]> {
		return Project.findByIds(ids, loadRelationIds);
	}
	async loadExtendedRelations(value: Project | Project[], exclude?: TModelNames[]) {
		const locationIds: string[] = [];
		if (Array.isArray(value))
			_.each(
				_.map(value, (i) => i.locationId),
				(i) => {
					if (i) locationIds.push(i);
				},
			);
		if (!Array.isArray(value) && value.locationId) locationIds.push(value.locationId);

		const locations = !exclude?.includes('Location') ? await this.locationsService.findByIds(locationIds) : [];

		return { Location: locations };
	}
}
