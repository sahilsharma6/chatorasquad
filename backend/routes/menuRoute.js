import express from 'express';
import authMiddleware from  '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import {addMenu,deleteMenu,getAllMenu,getAvailableMenu,getMenuDetails,getTrendingMenu,updateMenu,updateMenuAvailability} from '../controllers/menuController.js';
import { checkdeliveryaddress } from '../controllers/orderController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';
const router = express.Router();

router.post('/add',authMiddleware,checkAdmin,uploadMiddleware,addMenu);
router.get('/all',getAllMenu);
router.get('/getdetails/:id',getMenuDetails);
router.put('/update/:id',authMiddleware,checkAdmin,updateMenu);
router.put('/updateAvailability/:id',authMiddleware,checkAdmin,updateMenuAvailability);
router.delete('/delete/:id',authMiddleware,checkAdmin,deleteMenu);
// router.get('/filter',getFilteredMenu);
router.get('/toprated',getTrendingMenu);
router.get('/getavailable',getAvailableMenu);

router.post('/checkdelivery',checkdeliveryaddress); // checks if delivery is available at the given address

export default router;