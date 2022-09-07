import { displayStudents, showStudent, addStudent, deleteStudent } from '../handlers/student.handler';
import { authenticate_admin} from '../services/middlewares/auth.service';
import express from 'express';

const student_routes = (app: express.Application) => {
    app.get('/students', authenticate_admin, displayStudents);
    app.get('/students/:stud_id', authenticate_admin, showStudent);
    app.post('/students', authenticate_admin,addStudent);
    app.delete('/students/:stud_id', authenticate_admin, deleteStudent);
};

export default student_routes;