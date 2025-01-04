import express from 'express';
import { commentBlog, createBlog, deleteBlog, getBlog, getBlogs, getBlogsByUserId, getUserBlogs, likeBlog, updateBlog } from '../controllers/blogController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();


router.post('/add',authMiddleware,createBlog);
router.get('/all',getBlogs );
router.get('/getdetails/:id',getBlog); // id is the blogid
router.get('/userblogs/:id',getBlogsByUserId); // id is the userId

router.get('/myblogs',authMiddleware,getUserBlogs);
router.put('/update/:id',authMiddleware,updateBlog); // id is the blogid

router.delete('/delete/:id',authMiddleware,deleteBlog); // id is the blogid
router.post('/like/:id',authMiddleware,likeBlog); // id is the blogid
router.post('/comment/:id',authMiddleware,commentBlog); // id is the blogid


export default router;