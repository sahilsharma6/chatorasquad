import React, { useState } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../../services/apiClient'; 
import { toast, ToastContainer } from 'react-toastify';


const AddCuisineForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter a cuisine name',
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
     
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.post('/admin/addcuisine', { name });
      setLoading(false);
      setName('');
      toast.success('Cuisine added successfully',
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    } catch (err) {
      setLoading(false);
      setError('Failed to add cuisine. Please try again.');
      toast.error('Failed to add cuisine. Please try again.',
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
     
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-6 rounded-lg shadow-md text-black mx-8"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Cuisine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">Cuisine Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded border border-yellow-500 focus:outline-yellow-600 text-black"
            placeholder="Enter cuisine name"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded text-white"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Cuisine'}
        </button>
      </form>
      <ToastContainer />
    </motion.div>
  );
};

export default AddCuisineForm;
