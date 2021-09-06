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
	AfterLoad,
} from 'typeorm';
import { IBaseModel, TLoadRelationId, TLoadRelationIds } from '@helpers';
import { DB_SCHEMA_WPM } from '@environments';
import { Location } from '../locations/location.entity';
import _ from 'lodash';
import { Workplace } from '../workplaces/workplace.entity';

@Entity({ name: 'devices', schema: DB_SCHEMA_WPM })
export class Device extends BaseEntity implements IBaseModel<Device> {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	hostname!: string;

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

	@ManyToMany(() => Workplace, (workplace) => workplace.devices)
	workplaces?: Workplace[] | TLoadRelationIds;
	workplaceIds?: string[];

	// ----- LISTENERS -----
	@AfterLoad()
	mapLocationId(): void {
		this.locationId = this.location?.id;
	}
	@AfterLoad()
	mapWorkplaceIds(): void {
		this.workplaceIds = _.map(this.workplaces, (i) => i.id);
	}

	// ----- Other -----
	clear(): Device {
		const model = this as Device;
		model.location = undefined;
		model.workplaces = undefined;
		return model;
	}
}

interface IProperties {
	function?: string;
}
