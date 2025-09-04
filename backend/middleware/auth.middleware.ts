import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/const.utility';
import { IJwtPayload } from '../types/jwtPayload.type';

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    if (!auth) {
        res.status(401).send('Access denied. No token provided.');
        return;
    }

    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : auth;


    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');

        req.user = user as IJwtPayload;
        next();
    });
};
