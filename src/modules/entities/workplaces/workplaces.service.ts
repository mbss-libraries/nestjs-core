import { IBaseService, loadRelationIds, TModelNames } from '@helpers';
import { Injectable } from '@nestjs/common';
import { Workplace } from './workplace.entity';

@Injectable()
export class WorkplacesService implements IBaseService<Workplace> {
	available(authUserId: string): Promise<Workplace[]> {
		throw new Error('Method not implemented.');
	}
	async findOneById(id: string | undefined): Promise<Workplace | undefined> {
		if (id === undefined) return undefined;
		return await Workplace.findOne({ where: { id }, ...loadRelationIds });
	}
	async findByIds(ids: string[]): Promise<Workplace[]> {
		return await Workplace.findByIds(ids, loadRelationIds);
	}
	loadExtendedRelations(value: Workplace | Workplace[], exclude?: TModelNames[]) {
		throw new Error('Method not implemented.');
	}
}
