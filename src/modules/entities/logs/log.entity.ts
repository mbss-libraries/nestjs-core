import { DB_SCHEMA_MASTER } from '@environments';
import { IBaseModel } from '@helpers';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';

@Entity({ name: 'logs', schema: DB_SCHEMA_MASTER })
export class Log extends BaseEntity implements IBaseModel<Log> {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', nullable: true })
	name!: string | null;

	@Column({ type: 'text' })
	description!: string;

	// @Column({ type: 'simple-json', default: {} })
	// properties!: IProperties;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt!: Date;

	@VersionColumn({ default: 0 })
	_version!: number;

	// ----- Other -----
	clear(): Log {
		const model = this as Log;
		return model;
	}
}

// interface IProperties {}
