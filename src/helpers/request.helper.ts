/**
 * @Param T: TModelNames
 */
export class GlobalQueryDto<T extends string> {
	extended?: string;
	extendedInclude?: T[];
	all?: string;
	withDeleted?: string;
	ignorePermissions?: string;
}
