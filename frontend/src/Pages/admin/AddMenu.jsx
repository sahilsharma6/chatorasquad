import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const AddMenu = () => {
  const [formData, setFormData] = useState({
    name: '',
    title :'',
    type: 'Category 1',
    Cuisine: 'Indian',
    quantity: '',
    price: '',
    description: '',
    image: null
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg "
    >
        <h1 className='text-2xl'>Add Dish</h1>
      <form className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-4">
        <div>
        <label className="block text-gray-700 mb-2">Dish Name</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
            placeholder="Enter Dish Name"
            />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Dish Title</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
            placeholder="Enter Dish title"
            />
        
            </div>
        </div>

        <div className="grid lg:grid-cols-2  gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Select Dish Type</label>
            <select className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500">
              <option>Veg</option>
              <option> Non Veg</option>
              <option> Egg</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Cuisine</label>
            <select className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500">
              <option>Indian</option>
              <option>Italian</option>
              <option>Mexican</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2  gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Quantity</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="01"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="$10"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className="w-full px-4 py-4 border-gray-700 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
            placeholder="Message"
          />
        </div>

        <div>
  <label className="block text-gray-700 mb-2">Dish Images</label>
  <div className="flex items-center space-x-4">
    <motion.input
    multiple
      type="file"
      accept="image/*" // This will restrict the file types to images
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setFormData({ ...formData, image: file });
        }
      }}
      className="flex-1 px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
    />
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
    >
      <Upload size={36} />
    </motion.button>
  </div>
</div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddMenu;