import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import apiClient from '../../services/apiClient';

const AddMenu = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    type: 'Category 1',
    Cuisine: 'Indian',
    quantity: '',
    price: '',
    description: '',
    image: null
  });

  const [errors, setErrors] = useState({}); // State for error messages

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Dish Name is required';
    if (!formData.title) newErrors.title = 'Dish Title is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Dish Image is required';
    return newErrors;
  };

  const handelAdd = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }
    
    try {
      const data = await apiClient.post('/menu/add', formData);
      console.log(data);
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg transition-all"
    >
      <h1 className='text-4xl text-center mb-6'>Add Dish</h1>
      <form className="space-y-6" onSubmit={handelAdd}>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Dish Name</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="Enter Dish Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Dish Title</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="Enter Dish Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Select Dish Type</label>
            <select
              className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option>Veg</option>
              <option>Non Veg</option>
              <option>Egg</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Cuisine</label>
            <select
              className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              value={formData.Cuisine}
              onChange={(e) => setFormData({ ...formData, Cuisine: e.target.value })}
            >
              <option>Indian</option>
              <option>Italian</option>
              <option>Mexican</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Quantity</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="01"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="$10"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className="w-full px-4 py-4 border-gray-700 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
            placeholder="Message"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Dish Images</label>
          <div className="flex items-center space-x-4">
            <motion.input
              multiple
              type="file"
              accept="image/*"
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
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
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