import DB_Client from '../config/database/database';

export type question = {
	id?: number
    question: string,
    answer: string,
    hint: string,
	unit_id: number
};

export class questions{
    async index(): Promise<question[]> {
		const conn = await DB_Client.connect();
		const sql = 'SELECT * FROM questions';
		const result = await conn.query(sql);
		conn.release();
		return result.rows;
	}

	async getQuestionById(id: number): Promise<question> {
		const conn = await DB_Client.connect();
		const sql = `SELECT * FROM questions WHERE id=${id}`;
		const result = await conn.query(sql);
		conn.release();
		return result.rows[0];
	}

    async insertQuestion(question: question): Promise<void>{
		const conn = await DB_Client.connect();

		const sql = `INSERT INTO questions(question, answer, hint, unit_id) VALUES($1, $2, $3, $4)`;
		await conn.query(sql, [
			question.question,
			question.answer,
			question.hint,
			question.unit_id
		]);
		conn.release();
	}

    async deleteQuestion(id: number): Promise<void> {
        const conn = await DB_Client.connect();

		const sql = `DELETE FROM questions WHERE id=${id}`;
        await conn.query(sql);
		conn.release();
    }
}