import { BaseEntity } from 'typeorm';
import { Request as BaseRequest } from 'express';

export type IRequestModelsExists<T extends string> = {
	exists?: TModelsExists<T>;
};
export type TModelsExists<T extends string> = {
	[key in T]?: string[];
};
export type TModelsExistsUpdatedAt<T extends string> = {
	[key in T]?: { [key: string]: string };
};

export type IResponseIncludeModels<T extends string> = {
	[key in T]?: BaseEntity[];
} & { override?: T[]; delete?: { [key in T]?: string[] } };

export type TRequest = BaseRequest;
