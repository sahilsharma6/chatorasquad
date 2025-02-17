import express from 'express';
import checkAdmin from '../middlewares/checkAdmin.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import menuRoute from './menuRoute.js';
import hotelRoute from './hotelRoute.js';
import restaurantRoute from './restaurantRoute.js';
import { addCuisine, adddeliveryaddress, deleteCuisine, deletedeliveryaddress, getCuisineById, getCuisines, getDeliveryaddress, updateCuisine, updatedeliveryaddress , getOrders, updateOrderStatus, getOrderDetails, Orders, GetAllReviews, favoritesmenu } from '../controllers/orderController.js';
import { changeUserRole, DeleteUser, getUsers } from '../controllers/userController.js';
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
router.put('/user/delete',authMiddleware,checkAdmin,DeleteUser)

router.get('/orders',authMiddleware,Orders)
router.get('/getallorders/:id',authMiddleware,getOrders); // id is user id
router.put('/updateorderstatus/:id',authMiddleware,checkAdmin,updateOrderStatus); // id is order id
router.get('/orderdetails/:id',authMiddleware,getOrderDetails); // id is order id
router.get('/allreview',authMiddleware,checkAdmin,GetAllReviews)
router.get('/favoritesmenu',authMiddleware,checkAdmin,favoritesmenu)


router.use('/hotel',hotelRoute); // hotel routes for admin
router.use('/restaurant',restaurantRoute); // restaurant routes for admin

router.put('/changeuserrole',authMiddleware,checkAdmin,changeUserRole)

export default router;
