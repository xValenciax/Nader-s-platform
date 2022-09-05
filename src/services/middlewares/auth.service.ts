import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config/config';
import {Request, Response, NextFunction} from 'express';

const JWT_SECRET = config.JWT.SECRET_TOKEN;
const MODE = config.MODE;

// const verify_token_expiration = (req: Request, res: Response, token: string) => {
//     try {
//         const verify_token = jwt.verify(token, JWT_SECRET, (err, verified) => {
//             if (err) throw new Error(`Invalid Token: ${err}`);
//         });
//     }
//     catch (err) {
//         if (MODE === 'test' || MODE === 'dev')
//             res.sendStatus(403).json(err).end();
//         else
//             res.sendStatus(404).json('This resource does not exist').end();
//     }
// };

export const authenticate_admin = (req: Request,
    res: Response,
    next: NextFunction
) => {
    let decoded_token: JwtPayload|undefined;
    try {
        
        if (JWT_SECRET || config.JWT.SECRET_TOKEN) {
            const auth_token = ((req.headers.authorization as unknown) as string).split(' ')[1];
            
            try {
                jwt.verify(auth_token, JWT_SECRET, (err, verified) => {
                    if (err) throw new Error(`Invalid Token: ${err}`);
                    decoded_token = (verified as unknown) as JwtPayload;
                });
            }
            catch (err) {
                if (MODE === 'test' || MODE === 'dev')
                    res.sendStatus(403).json(err).end();
                else
                    res.sendStatus(404).json('This resource does not exist').end();
            }

            if (decoded_token !== undefined) {
                if (decoded_token.role !== 'admin') {
                    if (MODE === 'test' || MODE === 'dev')
                        res.sendStatus(401).json(`This resource could only be accessed by an adminstrator`).end();
                    else
                        res.sendStatus(404).json('This resource does not exist').end();
                }
                else {
                    res.sendStatus(200);
                    next();
                }
            }
            else
                res.sendStatus(500).json('Internal Server Error');
        }
    }
    catch (err: unknown) {
        res.sendStatus(500).json(err);
    }
};

export const authenticate_student = (req: Request, res: Response, next: NextFunction) => {
    const auth_token = ((req.headers.authorization as unknown) as string).split(' ')[1];

    
    if (auth_token || config.JWT.SECRET_TOKEN) {
        try {
            jwt.verify(auth_token, JWT_SECRET, (err) => {
                if (err) throw new Error(`Invalid Token: ${err}`);
                res.sendStatus(200).end();
                next();
            });
        }
        catch (err) {
            if (MODE === 'test' || MODE === 'dev')
                res.sendStatus(403).json(err).end();
            else
                res.sendStatus(404).json('Invalid id or password').end();
        }
    }
    else
        res.sendStatus(500).json('Internal Server Error');
};