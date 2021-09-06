import { TModelNames } from '@helpers';
export interface IBaseService<T> {
	available(authUserId: string): Promise<T[]>;
	findOneById(id: string | undefined): Promise<T | undefined>;
	findByIds(ids: string[]): Promise<T[]>;
	loadExtendedRelations(value: T | T[], exclude?: TModelNames[]);
}
