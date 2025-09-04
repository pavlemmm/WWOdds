import express from 'express';
import { authJWT } from '../middleware/auth.middleware';
import { getUsers, patchUser, deleteUser } from '../controllers/users.controller';
import { requireRole } from '../middleware/requireRole.middleware';

const router = express.Router();

// users/
router.get('/', authJWT, requireRole('admin'), getUsers);
router.delete('/:id', authJWT, requireRole('admin'), deleteUser);
router.patch('/:id', authJWT, requireRole('admin'), patchUser);

export default router;
