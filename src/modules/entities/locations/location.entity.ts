import { DB_SCHEMA_MASTER } from '@environments';
import { IBaseModel, TLoadRelationIds } from '@helpers';
import _ from 'lodash';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	VersionColumn,
	ManyToMany,
	JoinTable,
	AfterLoad,
	ManyToOne,
} from 'typeorm';
import { App } from '../apps/app.entity';
import { Project } from '../projects/project.entity';

@Entity({ name: 'locations', schema: DB_SCHEMA_MASTER })
export class Location extends BaseEntity implements IBaseModel<Location> {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

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

	/// ----- Relations -----
	@ManyToMany(() => App, (app) => app.locations)
	@JoinTable({ name: 'apps_has_locations' })
	apps?: App[] | TLoadRelationIds;
	appIds?: string[];

	/// ----- Relations -----
	@ManyToOne(() => Project, (project) => project.location)
	@JoinTable({ name: 'locations_has_project' })
	projects?: Project[] | TLoadRelationIds;
	projectIds?: string[];

	// ----- LISTENERS -----
	@AfterLoad()
	mapAppIds(): void {
		this.appIds = _.map(this.apps, (i) => i.id);
	}
	@AfterLoad()
	mapProjectIds(): void {
		this.projectIds = _.map(this.projects, (i) => i.id);
	}

	// ----- Other -----
	clear(): Location {
		const model = this as Location;
		model.apps = undefined;
		model.projects = undefined;
		return model;
	}
}

interface IProperties {
	language?: string;
}
