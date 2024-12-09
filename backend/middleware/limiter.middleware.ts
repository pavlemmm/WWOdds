import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many attempts from this IP, please try again after 15 minutes',
});

export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 2,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
