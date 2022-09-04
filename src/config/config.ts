import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: Number(process.env.PORT),
    mode: process.env.MODE,
    db_user: process.env.POSTGRES_USER,
    db_password: process.env.POSTGRES_PASSWORD,
    db_host: process.env.POSTGRES_HOST,
    db_name_dev: process.env.POSTGRES_DB_dev,
    db_name_test: process.env.POSTGRES_DB_test,
    db_name_prod: process.env.POSTGRES_DB_prod,
    jwt: {
        secret_token: process.env.JWT_TOKEN_SECRET
    }
};