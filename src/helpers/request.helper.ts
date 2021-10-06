/**
 * @Param T: TModelNames
 */
export class GlobalQueryDto<T extends string> {
	extended?: string | T[];
	all?: string;
	withDeleted?: string;
	ignorePermissions?: string;
}
