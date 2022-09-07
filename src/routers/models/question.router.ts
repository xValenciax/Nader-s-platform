import { displayQuestions, showQuestion, addQuestion, deleteQuestion } from '../../handlers/question.handler';
import { authenticate_admin, authenticate_student } from '../../services/middlewares/auth.service';
import { Application } from 'express';

const units_routes = (app: Application) => {
    app.get('/questions', authenticate_student, displayQuestions);
    app.get('/questions/:question_id', authenticate_student, showQuestion);
    app.post('/questions', authenticate_admin, addQuestion);
    app.delete('/questions/:question_id', authenticate_admin, deleteQuestion);
};

export default units_routes;