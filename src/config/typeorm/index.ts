import { NODE_ENV, TYPEORM } from '@environments';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as fs from 'fs';

const config = {
	...TYPEORM,
	type: 'postgres',
	// entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
	entities: ['src/modules/**/*.entity.{ts,js}'],
	// entities: ['../../**/*.entity.ts', '../../**/*.entity.ts'],
	// migrations: ['../../migration/*.ts'],
	// subscribers: ['../../subscriber/*.ts'],
	seeds: [`src/modules/**/seeds/*.{ts,js}`],
	// cli: {
	//   entitiesDir: '../../entities',
	//   migrationsDir: '../../migration',
	//   subscribersDir: '../../subscriber',
	// },
	synchronize: NODE_ENV === 'production' ? false : true,
	autoLoadEntities: true,
	keepConnectionAlive: true,
	logging: false,
	ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false, ca: process.env.SSL_CRT ? fs.readFileSync(process.env.SSL_CRT).toString() : '' } : false
};

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		return { ...config };
	}
}

export default config;
