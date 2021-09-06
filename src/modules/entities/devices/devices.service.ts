import { IBaseService, loadRelationIds, TModelNames } from '@helpers';
import { Injectable } from '@nestjs/common';
import { Device } from './device.entity';

@Injectable()
export class DevicesService implements IBaseService<Device> {
	available(authUserId: string): Promise<Device[]> {
		throw new Error('Method not implemented.');
	}
	async findOneById(id: string | undefined): Promise<Device | undefined> {
		if (id === undefined) return undefined;
		return await Device.findOne({ where: { id }, ...loadRelationIds });
	}
	async findByIds(ids: string[]): Promise<Device[]> {
		return await Device.findByIds(ids, loadRelationIds);
	}
	loadExtendedRelations(value: Device | Device[], exclude?: TModelNames[]) {
		throw new Error('Method not implemented.');
	}
}
