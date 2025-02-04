import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import apiClient from "../../services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

const AddBlogPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    images: null,
  });

  const [categories, setCategories] = useState([]);


  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/blog/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        images: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, category, content, images } = formData;

    const form = new FormData();
    form.append("title", title);
    form.append("category", category);
    form.append("content", content);
    if (images) form.append("images", images);

    try {
      const response = await apiClient.post("/blog/add", form);

      if (response.status === 201) {
        toast.success("Blog post added successfully!");
        setFormData({
          title: "",
          category: "",
          content: "",
          images: null,
        })

        setTimeout(() => {
          navigate("/admin/blogs/view");
        }, 2000);
      
      } else {
        toast.error("Failed to add blog post.");
      }
    } catch (error) {
      console.error("Error in submitting the form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6 max-w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-full mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-orange-500 mb-8">
          Add New Blog Post
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter blog title"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter blog content"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
          >
            <input
              type="file"
              id="img"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="img"
              className="flex flex-col items-center cursor-pointer"
            >
              <Upload className="w-12 h-12 text-orange-500 mb-4" />
              <p className="text-gray-600">
                Drag and drop your image here, or click to select
              </p>
              {formData.images && (
                <img
                  src={URL.createObjectURL(formData.images)}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </label>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-medium shadow-lg"
          >
            Publish Blog Post
          </motion.button>
        </form>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default AddBlogPage;
