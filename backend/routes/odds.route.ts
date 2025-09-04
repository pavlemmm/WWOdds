import express from 'express';
import { authJWT } from '../middleware/auth.middleware';
import { getOdds } from '../controllers/odds.controller';

const router = express.Router();

// info/
router.get('/', authJWT, getOdds);

export default router;
