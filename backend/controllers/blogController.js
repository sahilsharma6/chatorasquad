import mongoose from 'mongoose';
import User from '../models/User.js';
import Blogs from '../models/Blogs.js';
import BlogCategory from '../models/BlogCategory.js';

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content,category } = req.body;
    const images = req.files.map(file => file.path);

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
    category,
    image: images[0],
    });
     
    const blogCategory= await BlogCategory.findOne({ name: category });
   
    blogCategory.blogs.push(blog._id);
    await blogCategory.save();
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
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
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if(user.role === 'user'){
     blog.views += 1;
    await blog.save();
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
    const { title, content ,category} = req.body;

    const images = req.files.map(file => file.path);

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    if(blog.image){
       const oldImagePath = path.resolve(blog.image);
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${oldImagePath}`, err);
            }
          });
    } 

    blog.title = title;
    blog.content = content;
    blog.category = category;
    blog.image = images[0];

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
     const { userId } = req.body;
     if(!userId){
         return res.status(400).json({ message: 'User ID is required' });
        }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const user = await User.findById(userId );
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    const index = blog.likes.findIndex((id) => id === String(userId));
    if (index === -1) {
        blog.likes.push(userId);
        }
    else {
        blog.likes = blog.likes.filter((id) => id !== String(userId));
        }
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


export const getBlogsCategory = async (req, res) => {
    try {
        const category = await BlogCategory.find();
        res.status(200).json(category);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBlogCategory = async (req, res) => {
    try {
        const { name } = req.body;


        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const category = new BlogCategory({ 
            name,
         });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const category = await BlogCategory.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name;

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: `Invalid category ID: ${id}` });
      }


      const category = await BlogCategory.findById(id).populate('blogs');
      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      if (category.blogs && category.blogs.length > 0) {
          for (const blog of category.blogs) {
              await Blogs.findByIdAndRemove(blog._id);
          }
      }

      await BlogCategory.findByIdAndRemove(id);

      res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: 'Internal server error' });
  }
};