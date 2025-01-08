import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock, Flame } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import ConfirmationModal from '../components/ConfirmationModal';

const Blogs = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isDeleteModal,setIsDeleteModal]=useState(false)
  const [blogToDelete, setBlogToDelete] = useState(null); 

 
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "With ChatroaSquad you can order food for the whole day",
      description: "Scelerisque purus semper eget duis at. Tincidunt ornare massa eget egestas purus viverra. Morbi enim nunc faucibus a pellentesque...",
      date: "2024-01-23",
      author: "admin",
      views: 132,
      initialLikes: 18,
      category: "news",
      image: "https://quickeat-react.vercel.app/assets/img/news-2.jpg"
    },
    {
      id: 2,
      title: "127+ Couriers On Our Team Big Food Trends",
      description: "Scelerisque purus semper eget duis at. Tincidunt ornare massa eget egestas purus viverra. Morbi enim nunc faucibus a pellentesque...",
      date: "2025-01-04",
      author: "admin",
      views: 132,
      initialLikes: 10,
      category: "news",
      image: "https://quickeat-react.vercel.app/assets/img/news-3.jpg"
    },
    {
      id: 3,
      title: "Why You Should Optimize Your Menu for Delivery",
      description: "Scelerisque purus semper eget duis at. Tincidunt ornare massa eget egestas purus viverra. Morbi enim nunc faucibus a pellentesque...",
      date: "2024-12-09",
      author: "admin",
      views: 132,
      initialLikes: 20,
      category: "news",
      image: "https://quickeat-react.vercel.app/assets/img/news-7.jpg"
    }
  ]);


  const tabs = [
    { id: 'all', label: 'All Blogs', icon: Flame },
    { id: 'most-liked', label: 'Most Liked', icon: TrendingUp },
    { id: 'most-viewed', label: 'Most Viewed', icon: TrendingUp },
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'oldest', label: 'Oldest', icon: Clock },
  ];

  const handleDelete = (id) => {
    setBlogToDelete(id); 
    setIsDeleteModal(true); 
  };

  const confirmDelete = () => {
    setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== blogToDelete));
    console.log(`Blog with ID ${blogToDelete} deleted.`);
    setIsDeleteModal(false)
  };

  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => {
      const searchString = searchTerm.toLowerCase();
      return (
        blog.title.toLowerCase().includes(searchString) ||
        blog.description.toLowerCase().includes(searchString) ||
        blog.category.toLowerCase().includes(searchString) ||
        blog.date.includes(searchString)
      );
    });

  

    switch (activeTab) {
      case 'most-liked':
        return [...filtered].sort((a, b) => b.initialLikes - a.initialLikes);
      case 'most-viewed':
        return [...filtered].sort((a, b) => b.views - a.views);
      case 'latest':
        return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
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
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm sm:text-base flex items-center gap-2 transition-colors duration-200
                    ${activeTab === tab.id 
                      ? 'text-white bg-orange-500' 
                      : 'text-gray-600 hover:text-orange-500'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-orange-500 rounded-lg -z-10"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
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
          className={`grid grid-cols-1 md:grid-cols-2 ${role !== 'admin' && 'lg:grid-cols-3'} gap-8`}
        >
          {console.log(filteredAndSortedBlogs)
          }
          {filteredAndSortedBlogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
               <BlogCard {...blog} role={role} onDelete={handleDelete} />
            </motion.div>
          ))}
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
      {role==='admin' && <ConfirmationModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        onConfirm={confirmDelete}
      /> }
    </div>
  );
};

export default Blogs;