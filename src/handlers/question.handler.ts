import { question, questions } from '../models/question.entity';
import { Request, Response } from 'express';
import { config } from '../config/config';

const MODE = config.MODE;

const ques = new questions();
// admin route
export const displayQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await ques.index();
        res.status(200).json(result).end();
    }
    catch (err) {
        if (MODE === 'test' || MODE === 'dev')
            res.status(400).json(err).end();
        else
            res.status(400).json('Bad Request' + err).end();
    }
};

export const showQuestion = async (req: Request, res: Response): Promise<void> => {
    const unit_id = parseInt(req.params.question_id);
    try {
        const result = await ques.getQuestionById(unit_id);
        if (result !== undefined || result !== null)
            res.status(200).json(result).end();
        else
            res.status(500).json('Internal Server Error').end();
    }
    catch (err) {
        if (MODE === 'test' || MODE === 'dev')
            res.status(400).json(err).end();
        else
            res.status(400).json('Bad Request' + err).end();
    }
};

//admin route
export const addQuestion = async (req: Request, res: Response): Promise<void> => {
    const newquestion: question = {
        question: req.body.question,
        answer: req.body.answer,
        hint: req.body.hint,
        unit_id: req.body.unit_id
    };

    if (newquestion.question !== undefined && newquestion.answer !== undefined && newquestion.unit_id !== undefined) {
        try {
            await ques.insertQuestion(newquestion);
            res.status(201).json('Unit Added Successfully\n').end();
        }
        catch(err) {
            res.status(500).json('Internal Server Error' + err).end();
        }
    }
    else res.status(400).json('Please, provide the required information').end();
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    const ques_id = parseInt(req.params.question_id);

    try {
        await ques.deleteQuestion(ques_id);
        res.status(200).json('Student Deleted Successfully').end();
    }
    catch(err) {
        res.status(500).json('Internal Server Error' + err).end();
    }
};
