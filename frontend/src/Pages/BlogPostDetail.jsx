import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, User, Eye, ThumbsUp, Share2 } from "lucide-react";
import apiClient from "../services/apiClient";

const BlogPostDetail = () => {
  const { blogid } = useParams();
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await apiClient.get(`/blog/getdetails/${blogid}`);
        setBlogDetails(response.data);
      } catch (error) {
        console.error("Error fetching blog post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!blogDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog post not found.
      </div>
    );
  }

  const { title, category, content, image, date, views, likes, userId } =
    blogDetails;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        className="relative h-[60vh] bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={`${import.meta.env.VITE_API_URL}/${image}`}
          alt={title}
          className="w-full h-full object-cover opacity-60"
        />
        <motion.div
          className="absolute top-6 left-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-white gap-2 hover:text-orange-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        </motion.div>
      </motion.div>

      {/* Content Container */}
      <div className="max-w-full mx-auto px-6 -mt-20 relative z-10">
        <motion.article
          className="bg-white rounded-xl shadow-xl p-6 md:p-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Tags */}
          <div className="flex gap-3 mb-6">
            <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
              {category}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>by Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>
                {new Date(date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              <span>{likes.length} Likes</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="prose max-w-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>{content}</p>
          </motion.div>

          {/* Engagement Actions */}
          <motion.div
            className="flex justify-between items-center mt-8 pt-8 border-t"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-600 transition-colors"
              >
                <ThumbsUp className="w-5 h-5 hover:text-yellow-500" />
                <span>{likes.length}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPostDetail;
