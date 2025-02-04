import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function EditBlog() {
  const { blogId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/blog/getdetails/${blogId}`);
        const { title, category, content, image } = response.data;
        setFormData({
          title,
          category,
          content,
          image,
        });
      } catch (err) {
        setError("Failed to fetch blog details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [blogId]);

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
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatePayload = new FormData();
      updatePayload.append("title", formData.title);
      updatePayload.append("category", formData.category);
      updatePayload.append("content", formData.content);
      if (formData.image) {
        updatePayload.append("images", formData.image);
      }

      await apiClient.put(`/blog/update/${blogId}`, updatePayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

     toast.success("Blog post Edited successfully!");
      setFormData({
        title: "",
        category: "",
        content: "",
        image: null,
      });
      setTimeout(()=>navigate("/admin/blogs/view"),2000
      );
    } catch (err) {
      alert("Failed to update the blog. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading blog details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6 max-w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-full mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-orange-500 mb-8">
          Edit Blog Post
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title and Category Fields */}
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
                <option value="news">News</option>
                <option value="technology">Technology</option>
                <option value="food">Food</option>
              </select>
            </div>
          </motion.div>

          {/* content Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label className="block text-gray-700 font-medium mb-2">
              content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter blog content"
            />
          </motion.div>

          {/* Image Upload */}
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
              {formData.image && (
                <img
                  src={import.meta.env.VITE_API_URL+'/'+ formData.image}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-medium shadow-lg"
          >
            Update Blog Post
          </motion.button>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
