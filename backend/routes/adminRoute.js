import express from 'express';
import checkAdmin from '../middlewares/checkAdmin.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import menuRoute from './menuRoute.js';
import { addCuisine, adddeliveryaddress, deleteCuisine, deletedeliveryaddress, getCuisineById, getCuisines, getDeliveryaddress, updateCuisine, updatedeliveryaddress , getOrders, updateOrderStatus, getOrderDetails, Orders, GetAllReviews, favoritesmenu } from '../controllers/orderController.js';
import { changeUserRole, getUsers } from '../controllers/userController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';
import { createHotel, createHotelAdmin, deleteHotel, deleteHotelAdmin, getAllHotels, getHotelById, updateHotel, updateHotelAdmin } from '../controllers/hotelController.js';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant } from '../controllers/RestuarantController.js';
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
router.get('/favoritesmenu',authMiddleware,checkAdmin,favoritesmenu)

router.post('/addhotel',authMiddleware,checkAdmin,createHotel)
router.post('/addhoteladmin',authMiddleware,checkAdmin,createHotelAdmin)
router.put('/updatehotel',authMiddleware,checkAdmin,updateHotel)
router.put('/updatehotelAdmin/:id',authMiddleware,checkAdmin,updateHotelAdmin)
router.get('/hotel/:id',authMiddleware,checkAdmin,getHotelById)
router.get('/hotels',authMiddleware,checkAdmin,getAllHotels)
router.delete('/deletehotel',authMiddleware,checkAdmin,deleteHotel)
router.delete('/deletehotelAdmin/:id',authMiddleware,checkAdmin,deleteHotelAdmin)

router.put('/changeuserrole',authMiddleware,checkAdmin,changeUserRole)

router.post('/addrestaurant', authMiddleware, checkAdmin, createRestaurant);

// Update an existing restaurant
router.put('/updaterestaurant/:id', authMiddleware, checkAdmin, updateRestaurant);

// Get a specific restaurant by ID
router.get('/restaurant/:id', authMiddleware, checkAdmin, getRestaurantById);

// Get all restaurants
router.get('/restaurants', authMiddleware, checkAdmin, getAllRestaurants);

// Delete a restaurant
router.delete('/deleterestaurant/:id', authMiddleware, checkAdmin, deleteRestaurant);

export default router;
