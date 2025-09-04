import { RequestHandler } from 'express';

export const requireRole =
    (role: 'admin' | 'user'): RequestHandler =>
    (req, res, next) => {
        if (role === 'admin' && !req.user?.isAdmin) {
            res.status(403);
            return;
        }
        next();
    };
