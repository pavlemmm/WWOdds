import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/const.utility';
import { IJwtPayload } from '../types/jwtPayload.type';

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).send('Access denied. No token provided.');
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');

        // Attach the decoded user info to the request object
        req.user = user as IJwtPayload;
        next();
    });
};
