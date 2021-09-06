import { DB_SCHEMA_WPM } from '@environments';
import { IBaseModel, TLoadRelationId, TLoadRelationIds } from '@helpers';
import _ from 'lodash';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	JoinColumn,
	ManyToOne,
	ManyToMany,
	VersionColumn,
	JoinTable,
	AfterLoad,
} from 'typeorm';
import { Device } from '../devices/device.entity';
import { Location } from '../locations/location.entity';

@Entity({ name: 'workplaces', schema: DB_SCHEMA_WPM })
export class Workplace extends BaseEntity implements IBaseModel<Workplace> {
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
	_version?: number;

	/// ----- Relations -----
	@ManyToOne(() => Location)
	@JoinColumn({ name: 'location_id' })
	location?: Location | TLoadRelationId;
	locationId?: string;

	@ManyToMany(() => Device, (device) => device.workplaces)
	@JoinTable({ name: 'devices_has_workplaces' })
	devices?: Device[] | TLoadRelationIds;
	deviceIds?: string[];

	// ----- LISTENERS -----
	@AfterLoad()
	mapLocationId(): void {
		this.locationId = this.location?.id;
	}
	@AfterLoad()
	mapWorkplaceIds(): void {
		this.deviceIds = _.map(this.devices, (i) => i.id);
	}

	// ----- Other -----
	clear(): Workplace {
		const model = this as Workplace;
		model.location = undefined;
		model.devices = undefined;
		return model;
	}
}

interface IProperties {
	allowDuplicated?: boolean;
}
