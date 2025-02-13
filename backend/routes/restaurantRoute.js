import express from 'express';
import { changeRoleToRestaurant, createRestaurant, createRestaurantAdmin, deleteRestaurant, getAllRestaurants, getRestaurantById, getValidatedRestaurants, updateRestaurant, validateRestaurant } from '../controllers/RestaurantController';
import authMiddleware from '../middlewares/authMiddleware';
import checkAdmin from '../middlewares/checkAdmin';
import router from './hotelRoute';

router = express.Router();


router.get('/valid-restaurants',getValidatedRestaurants);
router.get('/all-restaurants',authMiddleware,checkAdmin,getAllRestaurants);
router.get('/:id',getRestaurantById);


router.put('/validate/:id',authMiddleware,checkAdmin,validateRestaurant); // id is restaurant id
router.put('/update/:id',authMiddleware,updateRestaurant); // id is restaurant id

router.post('/create',authMiddleware,checkAdmin,createRestaurant);
router.post('/addrestaurant',authMiddleware,checkAdmin,createRestaurantAdmin);

router.delete('/delete/:id',authMiddleware,deleteRestaurant); // id is restaurant id

router.put('/changerole/:id',authMiddleware,checkAdmin,changeRoleToRestaurant); // id is user id
export default router;
