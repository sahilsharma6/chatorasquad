import express from 'express';
import { getUser, UpdateUser, getdefaultAddress ,UpdatePassword ,UpdateAddress, deleteAddress, getAddresses, addAddress, UpdatePhone, UpdateEmail, setDefaultAddress} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { addOrder, getOrderDetails, getOrdersByFilter, updateOrderStatus } from '../controllers/orderController.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

router.get('/info/:id',authMiddleware ,getUser); // id is user id
router.put('/update/:id',authMiddleware,UpdateUser); // id is user id
router.put('/updatepassword/:id',authMiddleware,UpdatePassword); // id is user id
router.put('/updatephone/:id',authMiddleware,UpdatePhone); // id is user id
router.put('/updateemail/:id',authMiddleware,UpdateEmail); // id is user id


router.post('/addaddress/:id',authMiddleware,addAddress); // id is user id
router.get('/getdefaultaddress/:id',authMiddleware,getdefaultAddress); // id is user id
router.get('/getaddresses/:id',authMiddleware,getAddresses); // id is user id
router.put('/updateaddress/:id',authMiddleware,UpdateAddress); // id is address id
router.put('/setdefaultaddress/:id',authMiddleware,setDefaultAddress); // id is address id
router.delete('/deleteaddress/:id',authMiddleware,deleteAddress); // id is address id


router.get('/getfilteredorders/:id',authMiddleware,getOrdersByFilter); // id is user id
router.put('/updateorderstatus/:id',authMiddleware,checkAdmin,updateOrderStatus); // id is order id
router.get('/orderdetails/:id',authMiddleware,getOrderDetails); // id is order id
router.post('/addorder/:id',authMiddleware,addOrder); // id is user id


export default router;