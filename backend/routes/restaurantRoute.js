import express from 'express';
import { changeRoleToRestaurant, createRestaurant, createRestaurantAdmin, deleteRestaurant, getAllRestaurants, getRestaurantById, getValidatedRestaurants, updateRestaurant, validateRestaurant } from '../controllers/RestaurantController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import { addRestaurantCuisine, addRestaurantMenu, deleteRestaurantCuisine, deleteRestaurantMenu, getRestaurantCuisine, getRestaurantMenu, getRestaurantMenuById, updateRestaurantCuisine, updateRestaurantMenu } from '../controllers/RestuarantMenuController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();


router.get('/valid-restaurants',getValidatedRestaurants);
router.get('/all-restaurants',authMiddleware,checkAdmin,getAllRestaurants);
router.get('/:id',getRestaurantById);


router.put('/validate/:id',authMiddleware,checkAdmin,validateRestaurant); // id is restaurant id
router.put('/update/:id',authMiddleware,updateRestaurant); // id is restaurant id

router.post('/create',authMiddleware,checkAdmin,createRestaurant);
router.post('/addrestaurant',authMiddleware,checkAdmin,createRestaurantAdmin);

router.delete('/delete/:id',authMiddleware,deleteRestaurant); // id is restaurant id

router.put('/changerole/:id',authMiddleware,checkAdmin,changeRoleToRestaurant); // id is user id



router.get('/menus/:id',authMiddleware,getRestaurantMenu); // id is restaurant id
router.get('/menus/:id',authMiddleware,getRestaurantMenuById); // id is restaurantMenu id
router.post('/add-menu/:id',authMiddleware,checkAdmin,uploadMiddleware,addRestaurantMenu); // id is restaurant id

router.delete('/delete-menu/:id',authMiddleware,deleteRestaurantMenu); // id is restaurantMenu id
router.put('/update-menu/:id',authMiddleware,uploadMiddleware,updateRestaurantMenu); // id is restaurantMenu id


router.post('/add-cuisine/:id',authMiddleware,addRestaurantCuisine); // id is restaurant id
router.get('/cuisines/:id',authMiddleware,getRestaurantCuisine); // id is restaurant id
router.put('/update-cuisine/:id',authMiddleware,updateRestaurantCuisine); // id is restaurantCuisine id
router.delete('/delete-cuisine/:id',authMiddleware,deleteRestaurantCuisine); // id is restaurantCuisine id

export default router;
