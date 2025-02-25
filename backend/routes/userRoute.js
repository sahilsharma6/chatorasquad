import express from 'express';
import { getUser, UpdateUser, getdefaultAddress ,UpdatePassword ,UpdateAddress, deleteAddress, getAddresses, addAddress, UpdatePhone, UpdateEmail, setDefaultAddress, getUserForHotel, getUserById} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {  getOrderDetails, getOrdersByFilter, payment, updateOrderStatus, checkPaymentStatus, getOrders} from '../controllers/orderController.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import { addToCart, DeleteFromCart, getCart, updateQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.get('/details',authMiddleware ,getUser); // id is user id
router.post('/auth/verify-token',getUserForHotel)
router.put('/updatedetails',authMiddleware,UpdateUser); // id is user id
router.put('/updatepassword',authMiddleware,UpdatePassword); // id is user id
router.put('/updatephone',authMiddleware,UpdatePhone); // id is user id
router.put('/updateemail',authMiddleware,UpdateEmail); // id is user id


router.post('/addaddress',authMiddleware,addAddress); // id is user id
router.get('/getdefaultaddress/:id',authMiddleware,getdefaultAddress); // id is user id
router.get('/getaddresses',authMiddleware,getAddresses); // id is user id
router.put('/updateaddress/:id',authMiddleware,UpdateAddress); // id is address id
router.put('/setdefaultaddress/:id',authMiddleware,setDefaultAddress); // id is address id
router.delete('/deleteaddress/:id',authMiddleware,deleteAddress); // id is address id
router.get('/:id',authMiddleware,getUserById);



router.get('/getfilteredorders/:id',authMiddleware,getOrdersByFilter); // id is user id
router.get('/getallorders/:id',authMiddleware,getOrders); // id is user id
router.get('/orderdetails/:id',authMiddleware,getOrderDetails); // id is order id

router.post('/pay',authMiddleware,payment); 

router.get('/getcart',authMiddleware,getCart) ; 
router.post('/addtocart/:id',authMiddleware,addToCart); // id is itemId id
router.delete('/deletefromcart/:id',authMiddleware,DeleteFromCart); // id is itemId id
router.put('/updatecart/:id',authMiddleware,updateQuantity); // id is itemId id

router.post("/checkpaymentstatus/:id",checkPaymentStatus);

export default router;