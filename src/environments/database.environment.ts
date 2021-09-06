import { NODE_ENV } from './index';

const DB_HOST: string = process.env.DB_HOST || `localhost`;
const DB_PORT: number = +(process.env.DB_PORT ?? 5432);
const DB_USERNAME: string = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || 'root';
const DB_DATABASE: string = process.env.DB_DATABASE || 'master';

export const DB_SCHEMA_MASTER: string = process.env.DB_SCHEMA_MASTER || 'master';

//* ----- TypeORM -----
const enviroment = {
	development: {
		host: DB_HOST,
		port: DB_PORT,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		schema: DB_SCHEMA_MASTER,
	},
	testing: {
		host: DB_HOST,
		port: DB_PORT,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		schema: DB_SCHEMA_MASTER,
	},
	staging: {
		host: DB_HOST,
		port: DB_PORT,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		schema: DB_SCHEMA_MASTER,
	},
	production: {
		host: DB_HOST,
		port: DB_PORT,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		schema: DB_SCHEMA_MASTER,
	},
};
export const TYPEORM = enviroment[NODE_ENV];
