import DB_Client from '../config/database/database';

export enum unit_type {
    unit = 1,
    revision = 2,
    test = 3,
}

export enum release_status {
    available = 0,
    upcoming = 1
}

export type unit = {
    id?: number
    unit_name: string,
    unit_type: string,
    release_status: string
};

export class units{
    async index(): Promise<unit[]> {
		const conn = await DB_Client.connect();
		const sql = 'SELECT * FROM units';
		const result = (await conn.query(sql)).rows;
        conn.release();
        for (const ele of result) {
            ele.unit_type = unit_type[Number(ele.unit_type)];
            ele.release_status = release_status[Number(ele.release_status)];
        }
		return result;
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
                unit_type[(unit.unit_type as unknown) as unit_type],
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

    async getUnitByStatus(status: string) {
        const conn = await DB_Client.connect();
        
        const sql = `SELECT * FROM units WHERE release_status=${status}`;
        const result = (await conn.query(sql)).rows;
        for (const ele of result) {
            ele.unit_type = unit_type[Number(ele.unit_type)];
            ele.release_status = release_status[Number(ele.release_status)];
        }
        return result;
    }

    async getUnitByType(type: string) {
        const conn = await DB_Client.connect();
        
        const sql = `SELECT * FROM units WHERE unit_type=${type}`;
        const result = (await conn.query(sql)).rows;
        for (const ele of result) {
            ele.unit_type = unit_type[Number(ele.unit_type)];
            ele.release_status = release_status[Number(ele.release_status)];
        }
        return result;
    }
}