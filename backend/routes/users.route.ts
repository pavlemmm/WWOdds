import express from 'express';
import { authJWT } from '../middleware/auth.middleware.ts';
import { getUsers,patchUser,deleteUser } from '../controllers/users.controller.ts';

const router = express.Router();

// users/
router.get('/', authJWT, getUsers);
router.delete('/', authJWT, deleteUser);
router.patch('/', authJWT, patchUser);

export default router;
