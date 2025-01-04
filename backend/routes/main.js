import express from 'express';
import authRoute from './authRoute.js';
import menuRoute from './menuRoute.js';
import userRoute from './userRoute.js';
import adminRoute from './adminRoute.js';
import blogRoute from './blogRoute.js';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/menu', menuRoute);
router.use('/user', userRoute);
router.use('/admin',adminRoute);
router.use('/blog',blogRoute);
export default router;
