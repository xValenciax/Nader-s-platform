import dotenv from 'dotenv';

dotenv.config();

export const config = {
	PORT: Number(process.env.PORT),
	DB_PORT: Number(process.env.POSTGRES_PORT),
	MODE: String(process.env.MODE),
	DB_USER: String(process.env.POSTGRES_USER),
	DB_PASSWORD: String(process.env.POSTGRES_PASSWORD),
	DB_HOST: String(process.env.POSTGRES_HOST),
	DB_NAME_DEV: String(process.env.POSTGRES_DB_dev),
	DB_NAME_TEST: String(process.env.POSTGRES_DB_test),
	DB_NAME_PROD: String(process.env.POSTGRES_DB_prod),
	BCRYPT_PEPPER: String(process.env.BCRYPT_PEPPER),
	BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
	JWT: {
		SECRET_TOKEN: String(process.env.JWT_TOKEN_SECRET)
	}
};