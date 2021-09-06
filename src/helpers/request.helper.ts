/**
 * @Param T: TModelNames
 */
export class GlobalQueryDto<T extends string> {
	extended?: string;
	extendedExclude?: T[];
}
