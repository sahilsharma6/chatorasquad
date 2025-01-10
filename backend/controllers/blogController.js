import mongoose from 'mongoose';
import User from '../models/User.js';
import Blogs from '../models/Blogs.js';

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blog = new Blogs({
      userId: user._id,
      title,
      content,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Single Blog by ID
export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Blogs by Current User
export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({ userId: req.user._id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Blogs by Another User ID
export const getBlogsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const blogs = await Blogs.find({ userId: id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blogs.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid blog ID: ${id}` });
  }

  const blog = await Blogs.findByIdAndRemove(id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  res.json({ message: 'Blog deleted successfully.' });
};

// Like Blog
export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.likes += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Comment on Blog
export const commentBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Basic validation
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    blog.comments.push({ userId: user._id, email: user.email, content });
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
