import express from 'express';
import authMiddleware from  '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import {addMenu,getAllMenu,getMenuDetails,updateMenu,updateMenuAvailability} from '../controllers/menuController.js';
const router = express.Router();

router.post('/add',authMiddleware,checkAdmin,addMenu);
router.get('/all',getAllMenu);
router.get('/getdetails/:id',getMenuDetails);
router.put('/update/:id',authMiddleware,checkAdmin,updateMenu);
router.put('/updateAvailability/:id',authMiddleware,checkAdmin,updateMenuAvailability);


export default router;