import express from 'express';
import { authJWT } from '../middleware/auth.middleware.ts';
import { getUsers,patchUser,deleteUser } from '../controllers/users.controller.ts';

const router = express.Router();

// users/
router.get('/', authJWT, getUsers);
router.delete('/:id', authJWT, deleteUser);
router.patch('/:id', authJWT, patchUser);

export default router;
