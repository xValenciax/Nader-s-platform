import DB_Client from '../database/database';
import { config } from '../config/config';

enum unit_type {
    unit = 1,
    revision = 2,
    test = 3,
};

enum release_status {
    availabe = 0,
    upcoming = 1
};

export type available_unit = {
    unit_number: number,
    type: string,
    release_status: string
};

export class available_units{
    async index(): Promise<available_unit[]> {
		const conn = await DB_Client.connect();
		const sql = 'SELECT * FROM available_unit';
		const result = await conn.query(sql);
		conn.release();
		return result.rows;
	}

	async getUnitByNumber(unit_number: number): Promise<available_unit> {
		const conn = await DB_Client.connect();
		const sql = `SELECT * FROM available_unit WHERE unit_number=${unit_number}`;
		const result = await conn.query(sql);
		conn.release();
		return result.rows[0];
	}

    async insertStudent(available_unit: available_unit): Promise<void>{
		const conn = await DB_Client.connect();

		const sql = `INSERT INTO available_unit(unit_number, unit_type, release_status) VALUES($1, $2, $3)`;
        await conn.query(sql,
            [
                available_unit.unit_number,
                unit_type[(available_unit.type as unknown) as unit_type],
                release_status[(available_unit.release_status as unknown) as release_status]
        ]);
		conn.release();
	}

    async deleteUnit(unit_number: number): Promise<void> {
        const conn = await DB_Client.connect();

		const sql = `DELETE FROM available_units WHERE unit_number=${unit_number}`;
        await conn.query(sql);
		conn.release();
    }
}