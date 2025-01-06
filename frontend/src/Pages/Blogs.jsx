import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import BlogCard from '../components/BlogCard';


const Blogs = ({role}) => {
  const blogs = [
    {
      title: "With ChatroaSquad you can order food for the whole day",
      description: "Scelerisque purus semper eget duis at. Tincidunt ornare massa eget egestas purus viverra. Morbi enim nunc faucibus a pellentesque. Lobortis elementum nibh tellus molestie nunc non...",
      date: "01.Jan. 2022",
      author: "admin",
      views: 132,
      initialLikes:18,
      category: "news",
      image: "https://quickeat-react.vercel.app/assets/img/news-2.jpg"
    },
    {
      title: "127+ Couriers On Our Team Big Food Trends",
      description: "Scelerisque purus semper eget duis at. Tincidunt ornare massa eget egestas purus viverra. Morbi enim nunc faucibus a pellentesque. Lobortis elementum nibh tellus molestie nunc non...",
      date: "01.Jan. 2022",
      author: "admin",
      views: 132,
      initialLikes:10,
      category: "news",
      image: "https://quickeat-react.vercel.app/assets/img/news-3.jpg"
    },
    {
      title: "Why You Should Optimize Your Menu for Delivery",
      description: "Scelerisque purus semper eget duis at. Tincidunt ornare massa eget egestas purus viverra. Morbi enim nunc faucibus a pellentesque. Lobortis elementum nibh tellus molestie nunc non...",
      date: "01.Jan. 2022",
      author: "admin",
      views: 132,
      initialLikes:20,
      category: "news",
      image: "https://quickeat-react.vercel.app/assets/img/news-7.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-8 py-8 max-w-full">
      <h2 className='text-4xl mb-8 text-center'>Blogs</h2>
      <motion.div 
       className={`grid grid-cols-1 md:grid-cols-2 
        ${role!=='admin' && 'lg:grid-cols-3'}
        gap-8`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogCard {...blog} role={role} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Blogs;