import { DB_SCHEMA_MASTER } from '@environments';
import { IBaseModel, TLoadRelationIds } from '@helpers';
import _ from 'lodash';
import { Location } from '../locations/location.entity';
import {
	AfterLoad,
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';

@Entity({ name: 'apps', schema: DB_SCHEMA_MASTER })
export class App extends BaseEntity implements IBaseModel<App> {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column({ name: 'short_name', unique: true })
	shortName!: string;

	@Column({ type: 'simple-json', default: {} })
	properties!: IProperties;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt!: Date;

	@VersionColumn({ default: 0 })
	_version!: number;

	// ----- Relations -----
	@ManyToMany(() => Location, (location) => location.apps)
	locations?: Location[] | TLoadRelationIds;
	locationIds?: string[];

	// ----- LISTENERS -----
	@AfterLoad()
	mapLocationIds(): void {
		this.locationIds = _.map(this.locations, (i) => i.id);
	}

	// ----- Other -----
	clear(): App {
		const model = this as App;
		model.locations = undefined;
		return model;
	}
}

interface IProperties {
	hasProjects?: boolean;
	url?: string;
	description?: string;
	launchedAt?: Date;
}
