import express from 'express';
import authController from '../controllers/authController.js';
const router = express.Router();


router.get('/signup', authController.signUp);
router.get('/login', authController.login);

export default router;