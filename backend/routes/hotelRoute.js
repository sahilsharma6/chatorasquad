import express from 'express';
import { getHotelById, createHotel, updateHotel, deleteHotel,  getValidatedHotels, getAllHotels, validateHotel, getRooms, createRoom, deleteRoom, changeRoleToHotel, createHotelAdmin, setHotelPassword, getRoomById, Checkpassword, getHotelByName, getHotelsByUserId } from '../controllers/hotelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import { createOrder, getOrders, getOrdersByRestaurantId, getOrdersByRoomId } from '../controllers/RestaurantController.js';


const router = express.Router();


router.get('/valid-hotels', getValidatedHotels);
router.get('/all-hotels', getAllHotels);
router.get('/:id', getHotelById);
router.get('/user/:id', getHotelsByUserId);

// router.delete('/delete/:id', authMiddleware, deleteHotel);
router.put('/validate/:id',authMiddleware,checkAdmin,validateHotel);
router.put('/update/:id',authMiddleware,updateHotel);
router.post('/addpassword/:id',authMiddleware,setHotelPassword);
router.post('/create',createHotel);
router.post('/addhotel',authMiddleware,checkAdmin,createHotelAdmin);
router.put('/changerole/:id',authMiddleware,checkAdmin,changeRoleToHotel); // id is user id
router.delete('/delete/:id',authMiddleware,deleteHotel);

router.post('/roomsbyid/:id',getRoomById)
router.get('/rooms/:id',getRooms); // id is hotel id
router.post('/add-room/:id',authMiddleware,createRoom); // id is hotel id
router.delete('/delete-room/:id',authMiddleware,deleteRoom); // id is room id

router.post('/checkpassword/:id',Checkpassword)
router.post('/createorder',createOrder)
router.get('/get/orders',getOrders)
router.get('/getorders/:id',getOrdersByRestaurantId)
router.get('/getordersbyroomId/:id',getOrdersByRoomId)
router.get('/getorderbyId/:id',getOrdersByRestaurantId)




router.get('/hotelName/:hotelName', getHotelByName)
export default router;