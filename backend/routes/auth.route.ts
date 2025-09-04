import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerLimiter, loginLimiter } from '../middleware/limiter.middleware';
import { runValidation } from '../validators/runner.validators';
import { registerRules, loginRules } from '../validators/auth.validators';

const router = express.Router();

// auth/register
router.post('/register', registerLimiter, registerRules, runValidation, register);

// auth/login
router.post('/login', loginLimiter, loginRules, runValidation, login);

export default router;
