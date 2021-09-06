import { IBaseService, loadRelationIds, TModelNames } from '@helpers';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService implements IBaseService<User> {
	async loadExtendedRelations(value: User | User[], exclude?: TModelNames[]) {
		return {};
	}

	available(authUserId: string): Promise<User[]> {
		throw new Error('Method not implemented.');
	}

	async findOneById(id: string | undefined): Promise<User | undefined> {
		if (id === undefined) return undefined;
		return await User.findOne({ where: { id }, ...loadRelationIds });
	}
	async findOneByEmail(email: string | undefined): Promise<User | undefined> {
		if (email === undefined) return undefined;
		return await User.findOne({ where: { email }, ...loadRelationIds });
	}

	async findByIds(ids: string[]): Promise<User[]> {
		return await User.findByIds(ids, loadRelationIds);
	}
}
