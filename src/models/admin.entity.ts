import DB_Client from '../config/database/database';
import { config } from '../config/config';
import bcrypt from 'bcrypt';

export type admin = {
    admin_id: string,
    name: string,
    email: string,
	registeration_date?: Date,
	password: string
};

const PEPPER = config.BCRYPT_PEPPER;
const SALT_ROUNDS = config.BCRYPT_SALT_ROUNDS;

export class admins{
	async index(): Promise<admin[]> {
		const conn = await DB_Client.connect();
		const sql = 'SELECT * FROM admins';
		const result = await conn.query(sql);
		conn.release();
		return result.rows;
	}

	async getadminById(id: string): Promise<admin> {
		const conn = await DB_Client.connect();
		const sql = `SELECT * FROM admins WHERE admin_id=$1`;
		const result = await conn.query(sql, [id]);
		conn.release();
		return result.rows[0];
	}

	async ForgotPasswordOrId(email: string): Promise<admin>{
		const conn = await DB_Client.connect();
		const sql = `SELECT stud_id, password FROM admins WHERE email=$1`;
		const result = await conn.query(sql, [email]);
		conn.release();
		return result.rows[0];
	}

	async insertadmin(admin: admin): Promise<void>{
		const conn = await DB_Client.connect();
		const hash = await bcrypt.hash(
			admin.password + PEPPER,
			SALT_ROUNDS
		);
		const sql = `INSERT INTO admins(admin_id, name, email, password) VALUES($1, $2, $3, $4)`;
		await conn.query(sql, [admin.admin_id, admin.name, admin.email, hash]);
		conn.release();
	}

	async deleteadmin(id: string) {
		const conn = await DB_Client.connect();
		const sql = `DELET FROM admins WHERE admin_id=${id}`;
		await conn.query(sql);
		conn.release();
	}
}