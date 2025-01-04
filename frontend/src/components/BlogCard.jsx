import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const BlogCard = ({ title, description, date, author, views, category, image }) => {
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">{category}</span>
            <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">ChatroaSquad</span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 hover:text-orange-500 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
          
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-center text-orange-500 font-semibold mb-4 cursor-pointer"
          >
            Read More 
            <ChevronRight className="ml-1 w-4 h-4" />
          </motion.div>
  
          <div className="flex items-center text-sm text-gray-500 border-t pt-4">
            <span>by {author}</span>
            <span className="mx-4">•</span>
            <span>{date}</span>
            <span className="mx-4">•</span>
            <span>{views} views</span>
          </div>
        </div>
      </motion.div>
    );
  };
  export default BlogCard