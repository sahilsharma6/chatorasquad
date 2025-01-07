import React, { useState } from 'react';
import {  Plus, Search, } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from '../../components/ConfirmationModal';
import CategoryModal from '../../components/admin/Blogs/CategoryModal';
import CategoriesTable from '../../components/admin/Blogs/CategoriesTable';

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food', date: '2024-01-01' },
    { id: 2, name: 'Technology', date: '2024-01-02' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState({ type: null, category: null });
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen({ type: 'edit', category });
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setIsModalOpen({ type: null, category: null });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (isModalOpen.type === 'edit') {
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id ? editingCategory : cat
      ));
    } else if (isModalOpen.type === 'add') {
      const newCategory = {
        id: categories.length + 1,
        name: editingCategory.name,
        date: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen({ type: null, category: null });
  };

  const openDeleteModal = (category) => {
    setIsModalOpen({ type: 'confirm', category });
  };

  const openAddModal = () => {
    setEditingCategory({ name: '' });
    setIsModalOpen({ type: 'add', category: null });
  };

  const filteredCategories = categories.filter(category => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      category.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      category.date.includes(lowerCaseSearchTerm)
    );
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Categories
      </motion.h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-200"
          onClick={openAddModal}
        >
          <Plus className="w-5 h-5" /> Add Category
        </motion.button>

        <motion.div 
          className="relative flex-1 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="search"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </div>

    <CategoriesTable handleEdit={handleEdit} openDeleteModal={openDeleteModal} filteredCategories={filteredCategories} />

      {(isModalOpen.type === 'edit' || isModalOpen.type === 'add') && (
        <CategoryModal
          setEditingCategory={setEditingCategory}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen.type !== null}
          handleUpdate={handleUpdate}
          editingCategory={editingCategory}
          mode={isModalOpen.type}
        />
      )}

      {isModalOpen.type === 'confirm' && (
        <ConfirmationModal
          isOpen={isModalOpen.type === 'confirm'}
          onClose={() => setIsModalOpen({ type: null, category: null })}
          onConfirm={() => handleDelete(isModalOpen.category.id)}
        />
      )}
    </motion.div>
  );
};

export default Category;