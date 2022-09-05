import DB_Client from '../database/database';

export enum unit_type {
    unit = 1,
    revision = 2,
    test = 3,
};

export enum release_status {
    availabe = 0,
    upcoming = 1
};

export type unit = {
    id?: number
    unit_name: string,
    type: string,
    release_status: string
};

export class units{
    async index(): Promise<unit[]> {
		const conn = await DB_Client.connect();
		const sql = 'SELECT * FROM units';
		const result = await conn.query(sql);
		conn.release();
		return result.rows;
	}

	async getUnitById(id: number): Promise<unit> {
		const conn = await DB_Client.connect();
		const sql = `SELECT * FROM units WHERE id=${id}`;
		const result = await conn.query(sql);
        conn.release();
		return result.rows[0];
	}

    async insertUnit(unit: unit): Promise<void>{
		const conn = await DB_Client.connect();

        const sql = `INSERT INTO units(unit_name, unit_type, release_status) VALUES($1, $2, $3)`;
        await conn.query(sql,
            [
                unit.unit_name,
                unit_type[(unit.type as unknown) as unit_type],
                release_status[(unit.release_status as unknown) as release_status]
        ]);
		conn.release();
	}

    async deleteUnit(id: number): Promise<void> {
        const conn = await DB_Client.connect();

		const sql = `DELETE FROM units WHERE id=${id}`;
        await conn.query(sql);
		conn.release();
    }
}