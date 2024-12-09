import express from 'express';
import { authJWT } from '../middleware/auth.middleware.ts';
import { getInfo } from '../controllers/info.controller.ts';

const router = express.Router();

// info/
router.get('/', authJWT, getInfo);

export default router;
