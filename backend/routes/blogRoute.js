import express from 'express';
import { commentBlog, createBlog, deleteBlog, getBlog, getBlogs, getUserBlogs, likeBlog, updateBlog } from '../controllers/blogController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();


router.post('/add',authMiddleware,checkAdmin,createBlog);
router.get('/all',getBlogs );
router.get('/getdetails/:id',getBlog); // id is the blogid

router.get('/myblogs',authMiddleware,checkAdmin,getUserBlogs);
router.put('/update/:id',authMiddleware,checkAdmin,updateBlog); // id is the blogid

router.delete('/delete/:id',authMiddleware,checkAdmin,deleteBlog); // id is the blogid
router.post('/like/:id',authMiddleware,likeBlog); // id is the blogid
router.post('/comment/:id',authMiddleware,commentBlog); // id is the blogid


export default router;