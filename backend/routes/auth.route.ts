import express from 'express';
import { login, register } from '../controllers/auth.controller.ts'
import { loginLimiter, registerLimiter } from '../middleware/limiter.middleware.ts';

const router = express.Router();

// auth/login/
router.post('/login', loginLimiter, login);

// auth/register/
router.post('/register', registerLimiter, register);

export default router;
