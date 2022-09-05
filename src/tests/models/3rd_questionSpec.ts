import { questions } from "../../models/question.entity";

describe('2) unit entity test', () => { 
    const unit = new questions();
    const unit_id = 1;
    const unit_name = 'unit 1';
    const question = 'how are ...?';
    const answer = 'you';
    const hint = 'double check the phrases section in unit 1';
    beforeAll(async () => {

        const unit_obj = {
            question,
            answer,
            hint,
            unit_id
        };

        const ins = await unit.insertQuestion(unit_obj);

    });

    it('1.1) expects index function to return an array of units', async () => {
        const res = await unit.index();
        expect(res.length).toBe(1);
    });
    
    it('1.2) expects getUserById function to return a units whose name is name', async () => {
        const res = await unit.getQuestionById(1);
        expect(res.answer).toBe(answer);
    });
});