import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config/config';
import {Request, Response, NextFunction} from 'express';

const JWT_SECRET = config.JWT.SECRET_TOKEN;
const MODE = config.MODE;

export const authenticate_admin = (req: Request,
    res: Response,
    next: NextFunction
) => {
    let decoded_token: JwtPayload|undefined;
    try {
        
        if (JWT_SECRET || config.JWT.SECRET_TOKEN) {
            const auth_token = ((req.headers.authorization as unknown) as string).split(' ')[1];

            if (!auth_token) {
                if (MODE === 'test' || MODE === 'dev') {
                    res.status(403).json('A Token Is Required');
                }
                else
                    res.status(404).json('Not Found');
            }
            
            try {
                jwt.verify(auth_token, JWT_SECRET, (err, verified) => {
                    if (err) throw new Error(`Invalid Token: ${err}`);
                    decoded_token = (verified as unknown) as JwtPayload;
                });
            }
            catch (err) {
                if (MODE === 'test' || MODE === 'dev')
                    res.status(403).json(err).end();
                else
                    res.status(404).json('This resource does not exist').end();
            }

            if (decoded_token !== undefined) {
                if (decoded_token.role !== 'admin') {
                    if (MODE === 'test' || MODE === 'dev')
                        res.status(401).json(`This resource could only be accessed by an adminstrator`).end();
                    else
                        res.status(404).json('This resource does not exist').end();
                }
                else {
                    res.status(200);
                    next();
                }
            }
            else
                res.status(500).json('Internal Server Error');
        }
    }
    catch (err: unknown) {
        res.status(500).json(err);
    }
};

export const authenticate_student = (req: Request, res: Response, next: NextFunction) => {
    const auth_token = ((req.headers.authorization as unknown) as string).split(' ')[1];

    
    if (auth_token || config.JWT.SECRET_TOKEN) {
        try {
            jwt.verify(auth_token, JWT_SECRET, (err) => {
                if (err) throw new Error(`Invalid Token: ${err}`);
                res.status(200).end();
                next();
            });
        }
        catch (err) {
            if (MODE === 'test' || MODE === 'dev')
                res.status(403).json(err).end();
            else
                res.status(404).json('Invalid id or password').end();
        }
    }
    else
        res.status(500).json('Internal Server Error');
};