import { DB_SCHEMA_MASTER } from '@environments';
import { IBaseModel, TLoadRelationId } from '@helpers';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany,
	AfterLoad,
} from 'typeorm';
import { Location } from '../locations/location.entity';

@Entity({ name: 'projects', schema: DB_SCHEMA_MASTER })
export class Project extends BaseEntity implements IBaseModel<Project> {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column({ type: 'simple-json', default: {} })
	properties?: IProperties;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt!: Date;

	/// ----- Relations -----
	@OneToMany(() => Location, (location) => location.projects)
	location?: Location | TLoadRelationId;
	locationId?: string;

	// ----- LISTENERS -----
	@AfterLoad()
	mapAppId(): void {
		this.locationId = this.location?.id;
	}

	// ----- Other -----
	clear(): Project {
		const model = this as Project;
		model.location = undefined;
		return model;
	}
}

interface IProperties {
	user_ids?: string[];
	rules?: string[];
	settings?: {
		colors?: {
			holiday?: string;
		};
	};
	groups?: [
		{
			name: string;
			shift_ids: string[];
			order: number;
		},
	];
	googleCalendarId?: string;
	googleCalendarSync?: boolean;
	statistics?: {
		[key: string]: {
			extraUsers: number;
			extraDays: number;
		};
	};
}
