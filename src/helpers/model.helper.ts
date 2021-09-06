/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { BaseEntity } from 'typeorm';

/**
 * Use this variable to automatically load relation ids
 */
export const loadRelationIds = { loadRelationIds: { disableMixedMap: true } };

/**
 * Return value if the object defined above (loadRelationIds) is used when loading the relations
 */
export type TLoadRelationId = { id: string };
export type TLoadRelationIds = { id: string }[];

/**
 * This interface should be implemented by all models, because missing functions are automatically pointed out.
 */
export interface IBaseModel<T extends BaseEntity> {
	id: string;
	clear(): T;
}

export interface IBaseUser<T extends BaseEntity> extends IBaseModel<T> {
	getSmallUser(): T;
}

/**
 * Returns the base model using a string
 * @param model TModelNames
 * @returns T | undefined
 *
 * Creator @sstiels
 */
// export const getModelByString = <T extends typeof BaseEntity>(model: TModelNames): T | undefined => {
// 	if (model === 'User') return User as unknown as T;

// 	// if (model === 'Department') return Department as unknown as T;
// 	// if (model === 'Car') return Car as unknown as T;
// 	// if (model === 'CarRoom') return CarRoom as unknown as T;
// 	// if (model === 'CarRoomItem') return CarRoomItem as unknown as T;
// 	// if (model === 'Equipment') return Equipment as unknown as T;

// 	// if (model === 'Question') return Question as unknown as T;
// 	// if (model === 'Tag') return Tag as unknown as T;

// 	return undefined;
// };

/**
 * This function can be applied in the clear function of a model if one of the relations is a "Promise<Model[]">.
 * In this case variables like __hasModel__ are attached in the model. These variables are removed by this function.
 * @param model: BaseEntity
 * @returns BaseEntity
 *
 * Creator @sstiels
 */
export const clearLodashsInBaseEntity = <T extends BaseEntity>(model: T): T => {
	_.forEach(model, (value, key) => {
		if (key.includes('__')) {
			(model as any)[key] = undefined;
		}
	});
	return model;
};

/**
 * This function searches a response containing models (see IResponseIncludeModels) for them and tries to execute the clear function if it exists.
 * @param payload: unknown
 * @returns void
 *
 * Creator @sstiels
 */
export const clearModels = (payload: unknown, options: IClearModelsOptions = {}): void => {
	if (typeof payload === 'object') {
		_.forEach(payload, (value) => {
			if (_.isArray(value)) {
				_.forEach(value, (model, key) => {
					if (
						model &&
						typeof model === 'object' &&
						Object.keys(model).includes('clear') &&
						typeof (model as any).clear === 'function'
					) {
						(model as any).clear();
						if (isUser(model)) {
							if (!options.excludeConvertToSmallUser?.includes(model.id)) {
								value[key] = model.getSmallUser() as never;
							}
						}
					}
				});
			}
		});
	}
};

export const mapChildrenIdsFromModel = <T extends BaseEntity>(models: T[], child: string): string[] => {
	const ids: string[] = [];
	models.forEach((model) => {
		if (model[child]) {
			if (_.isArray(model[child])) ids.push(...model[child]);
			if (_.isString(model[child])) ids.push(model[child]);
		}
	});
	return _.uniq(ids);
};
interface IClearModelsOptions {
	excludeConvertToSmallUser?: string[];
}

function isUser(arg: any): arg is IBaseUser<any> {
	return arg && arg.getSmallUser && typeof arg.getSmallUser == 'function';
}
