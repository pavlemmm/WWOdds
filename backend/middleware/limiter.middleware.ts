import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 5, // limit each IP to 5 requests
    message: 'Too many attempts from this IP, please try again after 10 minutes',
});

export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 2,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
