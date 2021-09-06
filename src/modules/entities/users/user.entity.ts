import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	VersionColumn,
	AfterLoad,
} from 'typeorm';
import { IBaseModel } from '@helpers';
import { DB_SCHEMA_MASTER } from '@environments';

@Entity({ name: 'users', schema: DB_SCHEMA_MASTER })
export class User extends BaseEntity implements IBaseModel<User> {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ default: true })
	status?: boolean;

	@Column({ unique: true })
	email!: string;

	@Column({ nullable: true, unique: true })
	username?: string;

	@Column({ nullable: true })
	barcode?: string;

	@Column({ nullable: true, name: 'last_online_at' })
	lastOnlineAt?: Date;

	@Column({ type: 'simple-json', default: {} })
	properties?: IProperties;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt!: Date;

	@VersionColumn({ default: 0 })
	_version?: number;

	// ----- Relations -----
	// @ManyToMany(() => Permission)
	// @JoinTable({ name: 'user_has_permissions' })
	// permissions!: Promise<Permission[]>;
	rights!: string[];

	// @ManyToMany(() => Role)
	// @JoinTable({ name: 'role_has_users' })
	// roles!: Promise<Role[]>;

	// @ManyToMany(() => Department, (department) => department.users, { eager: true })
	// departments?: Department[] | TLoadRelationIds;
	// departmentIds?: string[];

	// @ManyToMany(() => Tag, (tag) => tag.users)
	// tags?: Tag[] | TLoadRelationIds;
	// tagIds?: string[];

	// @OneToMany(() => Tag, (tag) => tag.creator)
	// createdTags?: Tag[] | TLoadRelationIds;
	// createdTagIds?: string[];

	// ----- Listeners -----
	@AfterLoad()
	mapPermissionIds(): void {
		// this.permissionIds = _.map(this.permissions, (i) => i.id)
		this.rights = [];
	}
	// @AfterLoad()
	// mapDepartmentIds(): void {
	// 	this.departmentIds = _.map(this.departments, (i) => i.id);
	// }
	// @AfterLoad()
	// mapTagIds(): void {
	// 	this.tagIds = _.map(this.tags, (i) => i.id);
	// }
	// @AfterLoad()
	// mapCreatedTagIds(): void {
	// 	this.createdTagIds = _.map(this.createdTags, (i) => i.id);
	// }

	// ----- Other -----
	// getSaveUser = (): User => User.create({ ...this, password: undefined, rights: [] });
	getSmallUser = (): User => {
		return User.create({
			id: this.id,
			username: this.username,
			// rights: this.rights,
			properties: { global: { profile: this.properties?.global?.profile } },
		});
	};

	clear = (): User => {
		const model = this as User;
		// model.password = undefined;
		// model.permissions = undefined
		// model.departments = undefined;
		// model.tags = undefined;
		// model.createdTags = undefined;
		return model;
	};
}
interface IProperties {
	global?: IPropertiesGlobal;
	shift?: IPropertiesShift;
}
interface IPropertiesGlobal {
	navigationHistory?: TNavigationHistory;
	isMenuCondensed?: boolean;
	profile?: {
		avatar?: string;
		name?: string;
		title?: string;
		lastLogin?: string;
	};
	devices?: string[];
	google?: {
		spaceId?: string;
	};
}
interface IPropertiesShift {
	isFirstLogin?: boolean;
	global?: {
		weekoverview?: {
			isAvatarTooltip?: boolean;
			hideEmptyShifts?: boolean;
			showProfileImage?: boolean;
		};
	};
}
export type TNavigationHistory = {
	last?: string;
} & {
	[key: string]: ({
		[key: string]: string | null;
	} | null) & {
		last?: string;
	};
};
