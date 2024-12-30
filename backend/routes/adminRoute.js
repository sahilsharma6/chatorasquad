import express from 'express';
import checkAdmin from '../middlewares/checkAdmin.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { addCuisine, adddelivery, deleteCuisine, deletedelivery, getCuisineById, getCuisines, getDelivery, updateCuisine, updatedelivery } from '../controllers/orderController.js';

const router = express.Router();

router.get('/cuisines',authMiddleware, checkAdmin,getCuisines);     
router.get('/cuisines/:id',authMiddleware, checkAdmin,getCuisineById); // id is cuisine id
router.post('/addcuisine',authMiddleware,checkAdmin,addCuisine);
router.delete('/deletecuisine/:id',authMiddleware,checkAdmin,deleteCuisine); // id is cuisine id
router.put('/updatecuisine/:id',authMiddleware,checkAdmin,updateCuisine); // id is cuisine id

router.get('/deliveryLocations',authMiddleware,checkAdmin,getDelivery);
router.post('/adddeliveryLocation',authMiddleware,checkAdmin,adddelivery);
router.delete('/deletedeliveryLocation/:id',authMiddleware,checkAdmin,deletedelivery); // id is delivery id
router.put('/updatedeliveryLocation/:id',authMiddleware,checkAdmin,updatedelivery); // id is delivery id

export default router;