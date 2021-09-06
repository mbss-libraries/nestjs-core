import { IBaseService, loadRelationIds, mapChildrenIdsFromModel, TModelNames } from '@helpers';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AppsService } from '../apps/apps.service';
import { ProjectsService } from '../projects/projects.service';
import { Location } from './location.entity';

@Injectable()
export class LocationsService implements IBaseService<Location> {
	constructor(
		private appsService: AppsService,
		@Inject(forwardRef(() => ProjectsService)) private projectsService: ProjectsService,
	) {}

	available(authUserId: string): Promise<Location[]> {
		throw new Error('Method not implemented.');
	}
	async findOneById(id: string | undefined): Promise<Location | undefined> {
		return await Location.findOne({ id }, loadRelationIds);
	}
	async findByIds(ids: string[]): Promise<Location[]> {
		return await Location.findByIds(ids, loadRelationIds);
	}
	async loadExtendedRelations(value: Location | Location[], exclude?: TModelNames[]) {
		const appIds = Array.isArray(value) ? mapChildrenIdsFromModel(value, 'appIds') : value.appIds;
		const projectIds = Array.isArray(value) ? mapChildrenIdsFromModel(value, 'projectIds') : value.projectIds;

		const apps = !exclude?.includes('App') ? await this.appsService.findByIds(appIds ?? []) : [];
		const projects = !exclude?.includes('Project') ? await this.projectsService.findByIds(projectIds ?? []) : [];

		return { App: apps, Project: projects };
	}
}
