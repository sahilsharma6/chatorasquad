import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, Trash, X } from 'lucide-react';
import apiClient from '../../services/apiClient'; 

const CuisineCard = ({ cuisine, date, onEdit, onDelete }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between items-center w-48 h-40"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <h3 className="text-lg font-semibold">{cuisine}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="bg-orange-500 text-white py-3 rounded hover:bg-orange-600 px-4 "
        >
         <div className="flex gap-2">
            <Pencil className='mt-1' />
            <div>Edit</div>
         </div>
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
         <div className="flex gap-2">
            <Trash className='mt-1' />
            <div>Delete</div>
         </div>
        </button>
      </div>
    </motion.div>
  );
};

const ViewCuisine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCuisine, setCurrentCuisine] = useState(null);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await apiClient.get('/admin/cuisines'); 
        setCuisines(response.data); 
      } catch (error) {
        console.error('Error fetching cuisines:', error);
      }
    };

    fetchCuisines();
  }, []);

  const filteredCuisines = cuisines.filter((cuisine) => {
    const matchesName = cuisine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = cuisine.date.includes(searchDate);
    return matchesName && matchesDate;
  });

  const handleEdit = (cuisine) => {
    setCurrentCuisine(cuisine);
    setIsModalOpen(true);
  };

  const handleDelete = (cuisine) => {
    setCuisines(cuisines.filter((c) => c !== cuisine));
  };

  const handleSave = () => {
    setCuisines((prev) =>
      prev.map((c) =>
        c.name === currentCuisine.name ? currentCuisine : c
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">Cuisines</h1>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search by cuisine name"
          className="border rounded p-2 mb-4 w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border rounded p-2 mb-4 w-full"
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredCuisines.map((cuisine, index) => (
          <CuisineCard
            key={index}
            cuisine={cuisine.name}
            date={cuisine.date}
            onEdit={() => handleEdit(cuisine)}
            onDelete={() => handleDelete(cuisine)}
          />
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Edit Cuisine</h2>
                <X
                  size={33}
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer hover:bg-yellow-200 transition-all delay-100 rounded-full"
                />
              </div>

              <input
                type="text"
                value={currentCuisine?.name || ''}
                className="border border-orange-500 focus:border-orange-500  rounded p-4 mb-4 w-full"
                onChange={(e) =>
                  setCurrentCuisine({
                    ...currentCuisine,
                    name: e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewCuisine;
