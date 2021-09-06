import { BaseEntity } from 'typeorm';
import { Request as BaseRequest } from 'express';

export type IRequestModelsExists = {
	exists?: TModelsExists;
};
export type TModelsExists = {
	[key in TModelNames]?: string[];
};
export type TModelsExistsUpdatedAt = {
	[key in TModelNames]?: { [key: string]: string };
};

export type TModelNames = 'App' | 'Location' | 'Project' | 'User';
// export enum EModelNames {
//   User = 'User',

//   Tag = 'Tag',
//   Question = 'Question',

//   Department = 'Department',
//   Car = 'Car',
//   CarRoom = 'CarRoom',
//   CarRoomItem = 'CarRoomItem',
//   Equipment = 'Equipment',
// }

export type IResponseModels = {
	[key in TModelNames]?: BaseEntity[];
};
export interface IResponseIncludeModels extends IResponseModels {
	override?: TModelNames[];
	delete?: { [key in TModelNames]?: string[] };
}

export type TRequest = BaseRequest;
