import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const runValidation: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    res.status(400).json({
        message: 'Validation failed',
        details: errors.array().map((e: any) => ({ msg: e.msg, path: e.param })),
    });
};
