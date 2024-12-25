import express from 'express';
import authMiddleware from  '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import {addMenu,getAllMenu,getAvailableMenu,getFilteredMenu,getMenuBySearch,getMenuDetails,updateMenu,updateMenuAvailability} from '../controllers/menuController.js';
const router = express.Router();

router.post('/add',authMiddleware,checkAdmin,addMenu);
router.get('/all',getAllMenu);
router.get('/getdetails/:id',getMenuDetails);
router.put('/update/:id',authMiddleware,checkAdmin,updateMenu);
router.put('/updateAvailability/:id',authMiddleware,checkAdmin,updateMenuAvailability);
router.get('/search',getMenuBySearch);
router.get('/filter',getFilteredMenu);
router.get('/getavailable',getAvailableMenu);

export default router;