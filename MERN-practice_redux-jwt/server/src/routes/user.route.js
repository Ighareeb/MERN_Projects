import express from 'express';
import { updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/update/:id', updateUser, verifyToken);
router.delete('/delete/:id', deleteUser, verifyToken);

export default router;
