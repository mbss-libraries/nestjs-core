import { IResponseIncludeModels } from './declaration.helper';
import { clearModels } from './model.helper';

/**
 * This function can be used as a default return to the client to perform additional functions. For example, the models are cleaned from unnecessary variables.
 * @param res: Response<T>
 * @param data: T
 * @returns: Response<T, Record<string, unknown>>
 *
 * Creator @sstiels
 */
export const returnResponse = <T extends string>(
	data: IResponse<T>,
	options: IReturnResponseOptions = {},
): IResponse<T> => {
	clearModels(data, { excludeConvertToSmallUser: options.excludeConvertToSmallUser });
	return data;
};

interface IReturnResponseOptions {
	excludeConvertToSmallUser?: string[];
}

type IResponse<T extends string> = IResponseIncludeModels<T> & { [key: string]: any };
