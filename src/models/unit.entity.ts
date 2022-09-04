import DB_Client from '../database/database';
import { config } from '../config/config';

export type unit = {
    unit_number: number,
    question: string,
    answer: string,
    hint: string
};

export class units{
    async index(): Promise<unit[]> {
		const conn = await DB_Client.connect();
		const sql = 'SELECT * FROM units';
		const result = await conn.query(sql);
		conn.release();
		return result.rows;
	}

	async getUnitByNumber(id: number): Promise<unit> {
		const conn = await DB_Client.connect();
		const sql = `SELECT * FROM unit WHERE id=${id}`;
		const result = await conn.query(sql);
		conn.release();
		return result.rows[0];
	}

    async insertStudent(unit: unit): Promise<void>{
		const conn = await DB_Client.connect();

		const sql = `INSERT INTO unit(unit_number, question, answer, hint) VALUES($1, $2, $3, $4)`;
        await conn.query(sql,[]);
		conn.release();
	}

    async deleteUnit(id: number): Promise<void> {
        const conn = await DB_Client.connect();

		const sql = `DELETE FROM units WHERE id=${id}`;
        await conn.query(sql);
		conn.release();
    }
}