import express from 'express';
import authMiddleware from  '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import {addMenu,addReview,deleteMenu,deleteReview,getAllMenu,getAvailableMenu,getDairyAndBeveragesMenu,getMenuDetails,getRating,getReview,getReviws,getTrendingMenu,updateMenu,updateMenuAvailability, updatePrice, updateReview} from '../controllers/menuController.js';
import { checkdeliveryaddress, getItemsWithCategory } from '../controllers/orderController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';
const router = express.Router();

router.post('/add',authMiddleware,checkAdmin,uploadMiddleware,addMenu);
router.get('/all',getAllMenu);
router.get('/getdetails/:id',getMenuDetails);
router.put('/update/:id',authMiddleware,checkAdmin,uploadMiddleware,updateMenu);
router.put('/updateAvailability/:id',authMiddleware,checkAdmin,updateMenuAvailability);
router.delete('/delete/:id',authMiddleware,checkAdmin,deleteMenu);
// router.get('/filter',getFilteredMenu);
router.get('/toprated',getTrendingMenu);
router.get('/dairyandbeverages',getDairyAndBeveragesMenu);
router.get('/getavailable',getAvailableMenu);
router.put('/updateprice/:id',authMiddleware,checkAdmin,updatePrice)

router.post('/checkdelivery',checkdeliveryaddress); // checks if delivery is available at the given address


//id is the menuId 
router.get('/reviews/:id',getReviws);
router.post('/addreview/:id',authMiddleware,addReview);
router.delete('/deletereview/:id',authMiddleware,deleteReview);
router.put('/updatereview/:id',authMiddleware,updateReview); 
router.get('/getreview/:menuid',authMiddleware,getReview)
router.get('/rating/:id',getRating);


// get cuisine with items
router.get('/getItemsWithCategory', getItemsWithCategory);


export default router;