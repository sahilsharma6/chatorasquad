import express from 'express';
import authRoute from './authRoute.js';
import menuRoute from './menuRoute.js';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/menu', menuRoute);

export default router;
