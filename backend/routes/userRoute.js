import express from 'express';
import { getUser, UpdateUser, getAddress ,UpdatePassword ,UpdateAddress} from '../controllers/userController.js';

const router = express.Router();

router.get('/info/:id',getUser);
router.get('/getaddress/:id',getAddress);
router.put('/update/:id',UpdateUser);
router.put('/updatepassword/:id',UpdatePassword);
router.put('/updateaddress/:id',UpdateAddress);

export default router;