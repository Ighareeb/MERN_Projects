import express from 'express';
import {
	signIn,
	signUp,
	google,
	signOut,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/google', google);
router.get('/signOut', signOut);

export default router;
