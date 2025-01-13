import express from 'express';
import { commentBlog, createBlog, createBlogCategory, deleteBlog, deleteCategory, editCategory, getBlog, getBlogs, getBlogsCategory, getUserBlogs, likeBlog, updateBlog } from '../controllers/blogController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();


router.post('/add',authMiddleware,checkAdmin,uploadMiddleware,createBlog);
router.get('/all',getBlogs );
router.get('/getdetails/:id',getBlog); // id is the blogid

router.get('/myblogs',authMiddleware,checkAdmin,getUserBlogs);
router.put('/update/:id',authMiddleware,checkAdmin,uploadMiddleware,updateBlog); // id is the blogid

router.delete('/delete/:id',authMiddleware,checkAdmin,deleteBlog); // id is the blogid
router.post('/like/:id',authMiddleware,likeBlog); // id is the blogid
router.post('/comment/:id',authMiddleware,commentBlog); // id is the blogid

router.get('/category',authMiddleware,checkAdmin,getBlogsCategory);
router.post('/addcategory',authMiddleware,checkAdmin,uploadMiddleware,createBlogCategory);
router.put('/updatecategory/:id',authMiddleware,checkAdmin,uploadMiddleware,editCategory); // id is the category id
router.delete('/deletecategory/:id',authMiddleware,checkAdmin,deleteCategory); // id is the category id
export default router;