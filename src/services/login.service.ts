import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import {Request, Response} from 'express';
import { students } from '../models/student.entity';
import { admins } from '../models/admin.entity';
import bcrypt from 'bcrypt';

const JWT_SECRET = config.JWT.SECRET_TOKEN;
const MODE = config.MODE;
const BCRYPT_SALT = config.BCRYPT_PEPPER;

export const login_service = async (req: Request, res: Response): Promise<void> => {
    const stud_id = req.body.stud_id;
    const pass = req.body.password;
    if (!stud_id)
        res.status(400).json('Bad Request');
    const stud = new students();
    try {
        const returnedCredentials = await stud.getStudentById(stud_id);
        if (returnedCredentials !== undefined || returnedCredentials !== null || returnedCredentials) {
            if (bcrypt.compareSync(pass + BCRYPT_SALT, returnedCredentials.password)) {
                const token = jwt.sign({
                        id: returnedCredentials.stud_id,
                        name: returnedCredentials.name,
                        role: 'student'
                    },
                        (JWT_SECRET as unknown) as jwt.Secret,
                    {
                        expiresIn: '24h'
                    }
                );
                res.status(200).json(`Welcome ${returnedCredentials.name}\n ${token}`).end();
            }
            else {
                if (MODE === 'test' || MODE === 'dev')
                    res.status(401).json('Invalid Id or Password').end();
                else
                    res.status(404).json('Not Found').end();
            }
        }
        else {
            res.status(403).json('Admin Credentials Are Not Valid');
        }
    }
    catch(err) {
        res.status(500).json('Internal Server Error' + err);
    }
};

export const admin_login_service = async (req: Request, res: Response): Promise<void> => {
    const admin_id = req.body.admin_id;
    const pass = req.body.password;
    if (!admin_id)
    res.status(400).json('Bad Request');
    const adm = new admins();
    try {
        const returnedCredentials = await adm.getadminById(admin_id);
        if (returnedCredentials !== undefined || returnedCredentials !== null || returnedCredentials) {
            if (admin_id === returnedCredentials.admin_id) {
                if (bcrypt.compareSync(pass+BCRYPT_SALT, returnedCredentials.password)) {
                    const token = jwt.sign({
                            role: 'admin'
                        },
                            (JWT_SECRET as unknown) as jwt.Secret,
                        {
                            expiresIn: '24h'
                        }
                    );
                    res.status(200).json(`Welcome Admin\n ${token}`).end();
                }
                else {
                    if (MODE === 'test' || MODE === 'dev')
                        res.status(401).json('Invalid Id or Password').end();
                    else
                        res.status(404).json('Not Found').end();
                }
            }
        }
    }
    catch (err) {
        res.status(500).json('Internal Server Error' + err);
    }
};