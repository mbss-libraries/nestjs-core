import { Request as BaseRequest } from 'express';
import { BaseEntity } from 'typeorm';

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

export const regexValidEmail = RegExp(
	"/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/",
	'i',
);
