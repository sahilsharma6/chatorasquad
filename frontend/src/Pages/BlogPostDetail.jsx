import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, User, Eye, Share2, Bookmark, Heart, ThumbsUp } from 'lucide-react';

const BlogPostDetail = () => {
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
          src="https://quickeat-react.vercel.app/assets/img/news-2.jpg" 
          alt="Blog Cover" 
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
        {/* Article Card */}
        <motion.article 
          className="bg-white rounded-xl shadow-xl p-6 md:p-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Tags */}
          <div className="flex gap-3 mb-6">
            <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">news</span>
            <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">ChatroaSquad</span>
          </div>

          {/* Title */}
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            With Quickeat you can order food for the whole day
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
              <span>01.Jan. 2022</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>132 views</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              <span>245 Likes</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="prose max-w-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
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
                className="flex items-center gap-2 text-gray-600  transition-colors"
              >
                <ThumbsUp className="w-5 h-5 hover:text-yellow-500" />
                <span>245</span>
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

        {/* Related Posts */}
        {/* <motion.section 
          className="mt-12 mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <motion.div 
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <img 
                  src="/api/placeholder/400/200" 
                  alt="Related post" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold mb-2">127+ Couriers On Our Team Big Food Trends</h3>
                  <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section> */}
      </div>
    </div>
  );
};

export default BlogPostDetail;