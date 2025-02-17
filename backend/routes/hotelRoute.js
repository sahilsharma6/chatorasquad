import express from 'express';
import { getHotelById, createHotel, updateHotel, deleteHotel,  getValidatedHotels, getAllHotels, validateHotel, getRooms, createRoom, deleteRoom, changeRoleToHotel, createHotelAdmin, setHotelPassword, getRoomById } from '../controllers/hotelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';


const router = express.Router();


router.get('/valid-hotels', getValidatedHotels);
router.get('/all-hotels', getAllHotels);
router.get('/:id', getHotelById);

router.put('/validate/:id', authMiddleware, checkAdmin, validateHotel);
router.put('/update/:id', authMiddleware, updateHotel);
router.post('/addpassword/:id', authMiddleware, checkAdmin, setHotelPassword);
router.post('/create', createHotel);
router.post('/addhotel', authMiddleware, checkAdmin, createHotelAdmin);
router.put('/changerole/:id', authMiddleware, checkAdmin, changeRoleToHotel); // id is user id
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

export default router;