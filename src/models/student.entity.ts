import DB_Client from '../database/database';
import { config } from '../config/config';
import bcrypt from 'bcrypt';

export type student = {
    stud_id: string,
    name: string,
    email: string,
    password: string
};

const PEPPER = config.BCRYPT_PEPPER;
const SALT_ROUNDS = config.BCRYPT_SALT_ROUNDS;

export class users{
	async index(): Promise<student[]> {
		const conn = await DB_Client.connect();
		const sql = 'SELECT * FROM studnets';
		const result = await conn.query(sql);
		conn.release();
		return result.rows;
	}

	async getUserById(id: string): Promise<student> {
		const conn = await DB_Client.connect();
		const sql = `SELECT * FROM studnets WHERE stud_id=${id}`;
		const result = await conn.query(sql);
		conn.release();
		return result.rows[0];
	}

	async ForgotPasswordOrId(email: string): Promise<student>{
		const conn = await DB_Client.connect();
		const sql = `SELECT stud_id, password FROM studnets WHERE email=${email}`;
		const result = await conn.query(sql);
		conn.release();
		return result.rows[0];
	}

	async insertStudent(student: student): Promise<void>{
		const conn = await DB_Client.connect();
		const hash = await bcrypt.hash(
			student.password + PEPPER,
			SALT_ROUNDS
		);

		const sql = `INSERT INTO students(stud_id, name, email, password) VALUES($1, $2, $3, $4)`;
		await conn.query(sql, [student.stud_id, student.name, student.email, hash]);
		conn.release();
	}

	async deleteStudent(id: string) {
		const conn = await DB_Client.connect();
		const sql = `DELET FROM students WHERE stud_id=${id}`;
		await conn.query(sql);
		conn.release();
	}
}