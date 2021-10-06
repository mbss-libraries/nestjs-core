/**
 * @Param T: Entity extends IBaseModel
 * @Param R: TModelNames
 */
export interface IBaseService<T, R extends string> {
	available(authUserId: string): Promise<T[]>;
	findOneById(id: string | undefined): Promise<T | undefined>;
	findByIds(ids: string[]): Promise<T[]>;
	loadExtendedRelations(value: T | T[], extended?: boolean | R[]);
}
