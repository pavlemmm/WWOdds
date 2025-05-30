import express from 'express';
import { authJWT } from '../middleware/auth.middleware.ts';
import { getOdds } from '../controllers/odds.controller.ts';

const router = express.Router();

// info/
router.get('/', authJWT, getOdds);

export default router;
