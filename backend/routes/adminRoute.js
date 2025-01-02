import express from 'express';
import checkAdmin from '../middlewares/checkAdmin.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import menuRoute from './menuRoute.js';
import { addCuisine, adddeliveryaddress, deleteCuisine, deletedeliveryaddress, getCuisineById, getCuisines, getDeliveryaddress, updateCuisine, updatedeliveryaddress } from '../controllers/orderController.js';

const router = express.Router();

router.get('/cuisines',authMiddleware, checkAdmin,getCuisines);     
router.get('/cuisines/:id',authMiddleware, checkAdmin,getCuisineById); 
router.post('/addcuisine',authMiddleware,checkAdmin,addCuisine);
router.delete('/deletecuisine/:id',authMiddleware,checkAdmin,deleteCuisine); 
router.put('/updatecuisine/:id',authMiddleware,checkAdmin,updateCuisine);

router.get('/deliveryLocations',authMiddleware,checkAdmin,getDeliveryaddress);
router.post('/adddeliveryLocation',authMiddleware,checkAdmin,adddeliveryaddress);
router.delete('/deletedeliveryLocation/:id',authMiddleware,checkAdmin,deletedeliveryaddress); // id is delivery id
router.put('/updatedeliveryLocation/:id',authMiddleware,checkAdmin,updatedeliveryaddress); // id is delivery id

router.use('/menu', menuRoute); // menu routes for admin
export default router;