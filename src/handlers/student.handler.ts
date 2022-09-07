import { students, student } from '../models/student.entity';
import { Request, Response} from 'express';
import { config } from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import generator from 'generate-password';
import jwt from 'jsonwebtoken';

const JWT_SECRET = config.JWT.SECRET_TOKEN;
const MODE = config.MODE;

const stud: students = new students();

// admin route
export const displayStudents = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await stud.index();
        if (result != undefined || result != null)
            res.status(200).json(result).end();
        else
            res.status(500).json('No results returned from database').end();
    }
    catch (err) {
        if (MODE === 'test' || MODE === 'dev')
            res.status(400).json(err).end();
        else
            res.status(400).json('Bad Request' + err).end();
    }
};

export const showStudent = async (req: Request, res: Response): Promise<void> => {
    const student_id = req.params.stud_id;
    try {
        const result = await stud.getStudentById(student_id);
        if (result !== undefined)
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
export const addStudent = async (req: Request, res: Response) => {
    const password = generator.generate({
        length: 15,
        numbers: true,
        lowercase: true,
        uppercase: true,
    });
    const newStudent: student = {
        stud_id: uuidv4(),
        name: req.body.stud_name,
        email: req.body.stud_email,
        password
    };

    if (newStudent.name !== undefined && newStudent.email !== undefined) {
        try {
            const jwt_token = jwt.sign({
                    name: newStudent.name,
                    id: newStudent.stud_id
                },
                (JWT_SECRET as unknown) as jwt.Secret,
                {
                    expiresIn: '24h'
                }
            );
            await stud.insertStudent(newStudent);
            res.status(201).json('Student Added Successfully\n' + jwt_token).end();
        }
        catch(err) {
            res.status(500).json('Internal Server Error' + err).end();
        }
    }
    else res.status(400).json('Both Email And Name Field Must Be Provided').end();
};

export const deleteStudent = async (req: Request, res: Response) => {
    const stud_id = req.params.stud_id;

    try {
        await stud.deleteStudent(stud_id);
        res.status(200).json('Student Deleted Successfully').end();
    }
    catch(err) {
        res.status(500).json('Internal Server Error' + err).end();
    }
};