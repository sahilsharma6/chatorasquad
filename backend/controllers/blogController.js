import User from '../models/User.js';
import Blogs from '../models/Blogs.js';



export const createBlog = async (req, res) => {
    try {
    const { title, content } = req.body;
    const user = await User.findById(req.user._id);
    const blog = new Blogs({
        userId: user._id,
        email: user.email,
        title,
        content,
    });
   
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await
        Blogs.findById(id);
        res.status(200).json(blog);
    }

    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserBlogs = async (req, res) => {
     try {
        const blogs = await Blogs.find({ userId: req.user._id });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBlogsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const blogs = await Blogs.find({ userId: id });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateBlog = async (req, res) => {
    try{
    const {id} = req.params;
    const {title, content} = req.body;
    const blog = await Blogs.findByIdAndUpdate(id, {title, content}, {new: true});
    if(!blog) return res.status(404).send('No blog found');
    res.status(200).json(blog);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}


export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No blog with id: ${id}`);
    await Blogs.findByIdAndRemove(id);
    res.json({ message: "Blog deleted successfully." });
}


export const likeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findById(id);
        // const user = await User.findById(req.user._id);
        // user.likedBlogs.push(blog._id);
        blog.likes = blog.likes + 1;
        blog.save();
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const commentBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const blog = await Blogs.findById(id);
        const user = await User.findById(req.user._id);
        blog.comments.push({ userId: user._id, email: user.email, content });
        blog.save();
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}





