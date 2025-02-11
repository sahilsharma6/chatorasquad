import express from 'express';
import { getHotelById, createHotel, updateHotel, deleteHotel,  getValidatedHotels, getAllHotels, validateHotel, getRooms, createRoom, deleteRoom } from '../controllers/hotelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';


const router = express.Router();


router.get('/valid-hotels',authMiddleware,getValidatedHotels);
router.get('/all-hotels',authMiddleware,checkAdmin,getAllHotels);
router.get('/:id',authMiddleware,getHotelById);

router.put('/validate/:id',authMiddleware,checkAdmin,validateHotel);
router.put('/update/:id',authMiddleware,updateHotel);

router.post('/create',createHotel);

router.delete('/delete/:id',authMiddleware,deleteHotel);


router.get('/rooms/:id',authMiddleware,getRooms); // id is hotel id
router.post('/add-room/:id',authMiddleware,createRoom); // id is hotel id
router.delete('/delete-room/:id',authMiddleware,deleteRoom); // id is room id

export default router;