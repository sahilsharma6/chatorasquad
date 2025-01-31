import express from 'express';
import checkAdmin from '../middlewares/checkAdmin.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import menuRoute from './menuRoute.js';
import { addCuisine, adddeliveryaddress, deleteCuisine, deletedeliveryaddress, getCuisineById, getCuisines, getDeliveryaddress, updateCuisine, updatedeliveryaddress , getOrders, updateOrderStatus, getOrderDetails, Orders, GetAllReviews } from '../controllers/orderController.js';
import { getUsers } from '../controllers/userController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/cuisines',authMiddleware, checkAdmin,getCuisines);     
router.get('/cuisines/:id',authMiddleware, checkAdmin,getCuisineById); 
router.post('/addcuisine',authMiddleware,checkAdmin,uploadMiddleware,addCuisine);
router.delete('/deletecuisine/:id',authMiddleware,checkAdmin,deleteCuisine); 
router.put('/updatecuisine/:id',authMiddleware,checkAdmin,uploadMiddleware,updateCuisine);

router.get('/deliveryLocations',authMiddleware,checkAdmin,getDeliveryaddress);
router.post('/adddeliveryLocation',authMiddleware,checkAdmin,adddeliveryaddress);
router.delete('/deletedeliveryLocation/:id',authMiddleware,checkAdmin,deletedeliveryaddress); // id is delivery id
router.put('/updatedeliveryLocation/:id',authMiddleware,checkAdmin,updatedeliveryaddress); // id is delivery id

router.use('/menu', menuRoute); // menu routes for admin

router.use("/allusers",authMiddleware,checkAdmin,getUsers); // get all users
router.delete('/user/delete/:id',authMiddleware,checkAdmin)

router.get('/orders',authMiddleware,Orders)
router.get('/getallorders/:id',authMiddleware,getOrders); // id is user id
router.put('/updateorderstatus/:id',authMiddleware,checkAdmin,updateOrderStatus); // id is order id
router.get('/orderdetails/:id',authMiddleware,getOrderDetails); // id is order id
router.get('/allreview',authMiddleware,checkAdmin,GetAllReviews)

export default router;