import { students } from '../../models/student.entity';
import bcrypt from 'bcrypt';
import { config } from '../../config/config';

describe('1) Student entity test', () => {
    const stud_obj = new students();
    const stud_id = 'baf554b6-ddb2-4b2e-aaf0-8f1b8dcd150c';
    const name = 'Mahmoud Mohamed';
    const email = 'mamo31st@gmail.com';
    const password = 'hhhnnnhhh1';

    beforeAll(async () => {

        const stud = {
            stud_id,
            name,
            email,
            password
        };
        
    
        const ins = await stud_obj.insertStudent(stud);

    });
    
    it('1.1) expects index function to return an array of students', async () => {
        const res = await stud_obj.index();
        expect(res.length).toBe(1);
    });
    
    it('1.2) expects getUserById function to return a student whose name is name', async () => {
        const res = await stud_obj.getUserById(stud_id);
        expect(res.name).toBe(name);
    });
    
    it(`1.3) expects ForgotPasswordOrId function to return a student whose password is equal to ${email}`, async () => {
        const res = await stud_obj.ForgotPasswordOrId(email);
        const comparison = await bcrypt.compare(password + config.BCRYPT_PEPPER, res.password);
        expect(comparison).toBe(true);
    });

});