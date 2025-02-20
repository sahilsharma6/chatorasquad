import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import apiClient from '../../../services/apiClient';
import { toast, ToastContainer } from 'react-toastify';

const DeleteUserModal = ({deleteEmail,isOpen,setIsOpen}) => {
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
console.log(email);

  const handleDelete =async () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // TODO: Implement actual delete user logic
    console.log(email);
    
    const res= await apiClient.put(`/admin/user/delete`,{email});
    if(!res)return setError('Invalid email');
    console.log('Deleting user with email:', email);
    toast.success('User Deleted successfully',{
      position: "top-right",
      // autoClose: 2000,
    });
    // setTimeout(()=> window.location.reload(),2000);
    // Reset state and close modal
    setEmail('');
    setError('');
    setIsOpen(false);
  };

  return (
    <>
      

      <AnimatePresence>
        <ToastContainer />
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-96 p-6 rounded-lg shadow-xl relative"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-red-600">Delete User Account</h2>
              
              <p className="text-gray-600 mb-4">
                To confirm deletion, please enter this email address : {isOpen.deleteEmail}
              </p>

              <input 
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email"
                className="w-full p-4 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />

              {error && (
                <p className="text-red-500 text-sm mb-2">{error}</p>
              )}

              <div className="flex space-x-2 mt-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-gray-300 p-2 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteUserModal;