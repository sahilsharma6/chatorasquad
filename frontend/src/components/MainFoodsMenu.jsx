import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenuData from '../Data/FoodMainMenu.json'
import { Utensils } from 'lucide-react';

const categories = [
  { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
  { id: 'drinks', name: 'Drink & Juice', icon: '🥤' },
  { id: 'pizza', name: 'Chicken Pizza', icon: '🍕' },
  { id: 'pasta', name: 'PASTA', icon: '🍝' },
];



const FoodMainMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems,setMenuItems]=useState(MainMenuData)
  
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-orange-50 shadow-lg">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm"><Utensils /> </span>
          </motion.div>
          <h2 className="text-orange-500 font-semibold">FOOD MENU</h2>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm"><Utensils /> </span>
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold mb-8">ChatoraSquad Foods Menu</h1>

        {/* Categories */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                selectedCategory === category.id ? 'bg-orange-500 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8  shadow-md py-6 px-4"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-orange-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hover:text-white shadow-md cursor-pointer flex-wrap"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className=" text-sm">{item.description}</p>
              </div>
              <div className="text-xl font-bold text-black">
                ${item.price}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FoodMainMenu;