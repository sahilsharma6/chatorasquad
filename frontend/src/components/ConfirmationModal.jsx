import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Modal variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      y: -20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Icon */}
            <motion.div 
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="px-6 pb-6 text-center">
              <motion.h2
                className="text-2xl font-semibold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Are you sure?
              </motion.h2>
              
              <motion.p
                className="text-gray-600 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Do you really want to delete these records?
                <br />
                This process cannot be undone.
              </motion.p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-gray-200 rounded-md text-gray-800 font-medium hover:bg-gray-300 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-red-500 rounded-md text-white font-medium hover:bg-red-600 transition-colors"
                  onClick={onConfirm}
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ConfirmationModal
// const [isModalOpen, setIsModalOpen] = React.useState(false);

//   return (
//     <div className="p-4">
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="px-4 py-2 bg-red-500 text-white rounded-md"
//       >
//         Open Modal
//       </button>

//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={() => {
//           console.log('Confirmed');
//           setIsModalOpen(false);
//         }}
//       />
//     </div>
//   );