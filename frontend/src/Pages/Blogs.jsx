import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, Clock, Flame } from "lucide-react";
import BlogCard from "../components/BlogCard";
import ConfirmationModal from "../components/ConfirmationModal";
import apiClient from "../services/apiClient";

const tabs = [
  { label: "All", value: "all" },
  { label: "Trending", value: "trending" },
  { label: "Latest", value: "latest" },
];

const Blogs = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get("/blog/all");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    setBlogToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog.id !== blogToDelete)
    );
    console.log(`Blog with ID ${blogToDelete} deleted.`);
    setIsDeleteModal(false);
  };

  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs.filter((blog) => {
      const searchString = searchTerm.toLowerCase();
      return (
        blog.title.toLowerCase().includes(searchString) ||
        blog.content.toLowerCase().includes(searchString) ||
        blog.category.toLowerCase().includes(searchString) ||
        blog.date.includes(searchString)
      );
    });

    switch (activeTab) {
      case "most-liked":
        return [...filtered].sort((a, b) => b.initialLikes - a.initialLikes);
      case "most-viewed":
        return [...filtered].sort((a, b) => b.views - a.views);
      case "latest":
        return [...filtered].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      case "oldest":
        return [...filtered].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      default:
        return filtered;
    }
  }, [blogs, searchTerm, activeTab]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blogs
      </motion.h2>

      <motion.div
        className="mb-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-4 py-2 rounded-lg text-sm sm:text-base flex items-center gap-2 transition-colors duration-200
      ${
        activeTab === tab.value
          ? "text-white bg-orange-500"
          : "text-gray-600 hover:text-orange-500"
      }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    className="absolute inset-0 bg-orange-500 rounded-lg -z-10"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
         
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`grid grid-cols-1 md:grid-cols-2 ${
            role !== "admin" && "lg:grid-cols-3"
          } gap-8`}
        >
          {loading ? (
            <p>Loading blogs...</p>
          ) : (
            filteredAndSortedBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard {...blog} role={role} onDelete={handleDelete} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {filteredAndSortedBlogs.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-8"
        >
          No blogs found matching your criteria.
        </motion.p>
      )}
      {role === "admin" && (
        <ConfirmationModal
          isOpen={isDeleteModal}
          onClose={() => setIsDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default Blogs;
