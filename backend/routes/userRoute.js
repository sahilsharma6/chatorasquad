import express from 'express';
import { getUser, UpdateUser, getdefaultAddress ,UpdatePassword ,UpdateAddress, deleteAddress, getAddresses, addAddress, UpdatePhone, UpdateEmail, setDefaultAddress} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { addOrder, getOrderDetails, getOrdersByFilter, updateOrderStatus } from '../controllers/orderController.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import { addtoCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/details',authMiddleware ,getUser); // id is user id
router.put('/updatedetails',authMiddleware,UpdateUser); // id is user id
router.put('/updatepassword',authMiddleware,UpdatePassword); // id is user id
router.put('/updatephone',authMiddleware,UpdatePhone); // id is user id
router.put('/updateemail',authMiddleware,UpdateEmail); // id is user id



router.post('/addaddress',authMiddleware,addAddress); // id is user id
router.get('/getdefaultaddress/:id',authMiddleware,getdefaultAddress); // id is user id
router.get('/getaddresses',authMiddleware,getAddresses); // id is user id
router.put('/updateaddress',authMiddleware,UpdateAddress); // id is address id
router.put('/setdefaultaddress/:id',authMiddleware,setDefaultAddress); // id is address id
router.delete('/deleteaddress/:id',authMiddleware,deleteAddress); // id is address id


router.get('/getfilteredorders/:id',authMiddleware,getOrdersByFilter); // id is user id
router.put('/updateorderstatus/:id',authMiddleware,checkAdmin,updateOrderStatus); // id is order id
router.get('/orderdetails/:id',authMiddleware,getOrderDetails); // id is order id
router.post('/addorder/:id',authMiddleware,addOrder); // id is user id

router.get('/getcart',authMiddleware,getCart) ; // id is user id
router.put('/updatecart',authMiddleware,addtoCart); // id is user id


export default router;