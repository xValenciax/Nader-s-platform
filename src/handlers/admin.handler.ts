import { admins, admin } from '../models/admin.entity';
import { Request, Response} from 'express';
import { config } from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import generator from 'generate-password';
import jwt from 'jsonwebtoken';

const JWT_SECRET = config.JWT.SECRET_TOKEN;
const MODE = config.MODE;

const adm: admins = new admins();

// admin route
export const displayadmins = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await adm.index();
        if (result !== undefined)
            res.status(200).json(result).end();
        else
            res.status(500).json('Internal Server Error').end();
    }
    catch (err) {
        if (MODE === 'test' || MODE === 'dev')
            res.status(400).json(err).end();
        else
            res.status(400).json('Bad Request').end();
    }
};

export const showadmin = async (req: Request, res: Response): Promise<void> => {
    const student_id = req.params.admin_id;
    try {
        const result = await adm.getadminById(student_id);
        if (result !== undefined)
            res.status(200).json(result).end();
        else
            res.status(500).json('Internal Server Error').end();
    }
    catch (err) {
        if (MODE === 'test' || MODE === 'dev')
            res.status(400).json(err).end();
        else
            res.status(400).json('Bad Request').end();
    }
};

//admin route
export const addadmin = async (req: Request, res: Response) => {
    const password = generator.generate({
        length: 15,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true
    });
    const admini: admin = {
        admin_id: uuidv4(),
        name: req.body.admin_name,
        email: req.body.admin_email,
        password
    };

    if (admini.name !== undefined && admini.email !== undefined) {
        try {
            const jwt_token = jwt.sign({
                    name: admini.name,
                    id: admini.admin_id,
                    role: 'admin'
                },
                (JWT_SECRET as unknown) as jwt.Secret,
                {
                    expiresIn: '24h'
                }
            );
            await adm.insertadmin(admini);
            res.status(201).json('Student Added Successfully\n' + jwt_token).end();
        }
        catch(err) {
            res.status(500).json('Internal Server Error' + err).end();
        }
    }
    else res.status(400).json('Both Email And Name Field Must Be Provided').end();
};

export const deleteadmin = async (req: Request, res: Response) => {
    const admin_id = req.params.admin_id;

    try {
        await adm.deleteadmin(admin_id);
        res.status(200).json('Student Deleted Successfully').end();
    }
    catch(err) {
        res.status(500).json('Internal Server Error' + err).end();
    }
};