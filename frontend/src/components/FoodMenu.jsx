import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Utensils } from 'lucide-react';
import DishesData from '../Data/popularFood.json'

const DishCard = ({ dish }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden p-6 shadow-lg group bg-white hover:bg-orange-500 transition duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Like Button */}
      <motion.button
        className={`absolute top-4 right-4 ${
          isLiked ? 'text-orange-500' : 'text-gray-400'
        } group-hover:text-white`}
        onClick={() => setIsLiked(!isLiked)}
        whileTap={{ scale: 0.9 }}
      >
        <Heart className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} />
      </motion.button>

      {/* Extra Buttons (Eye and Bag) always visible on the right side */}
      <div className="absolute right-0 top-11 z-10 space-y-2 flex flex-col items-center ">
        <motion.button
          className="block p-2 rounded-full bg-white/50 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingBag className="w-4 h-4" />
        </motion.button>
        <motion.button
          className="block p-2 rounded-full bg-white/50 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Eye className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Card Image */}
      <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 ">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2 group-hover:text-white">{dish.name}</h3>
        <p className="text-sm mb-4 group-hover:text-white">{dish.description}</p>
        <motion.p
          className="text-xl font-bold"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          ${dish.price}
        </motion.p>
      </div>
    </motion.div>
  );
};

const FoodMenu = () => {
  const [dishes, setDishes] = useState(DishesData);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <motion.div
            whileHover={{ scale: 2 }}
            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm"><Utensils /> </span>
          </motion.div>
          <h2 className="text-orange-500 font-semibold">POPULAR DISHES</h2>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm"><Utensils /> </span>
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold">Top-Selling Dishes</h1>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {dishes.map((dish, index) => (
          <DishCard key={index} dish={dish} />
        ))}
      </motion.div>
    </div>
  );
};

export default FoodMenu;
