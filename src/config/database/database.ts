import { config } from '../config';
import { Pool } from 'pg';

let DB_Client: Pool = new Pool;

if (config.MODE === 'test') {
	DB_Client = new Pool({
		host: config.DB_HOST,
		database: config.DB_NAME_TEST,
		user: config.DB_USER,
		password: config.DB_PASSWORD,
		port: config.DB_PORT
	});
}

else if (config.MODE === 'dev') {
	DB_Client = new Pool({
		host: config.DB_HOST,
		database: config.DB_NAME_DEV,
		user: config.DB_USER,
		password: config.DB_PASSWORD,
		port: config.DB_PORT
	});
}

else if (config.MODE === 'prod') {
	DB_Client = new Pool({
		host: config.DB_HOST,
		database: config.DB_NAME_PROD,
		user: config.DB_USER,
		password: config.DB_PASSWORD,
		port: config.DB_PORT
	});
}

export default DB_Client;