import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Loader Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center"
      >
        {/* Plate */}
        <div className="w-28 h-28 bg-yellow-200 rounded-full flex items-center justify-center border-t-2 ">
         
          <motion.div
            className="absolute w-3 h-12 bg-gray-500 rounded-full"
            style={{ transform: "rotate(45deg)", top: "35%", left: "60%" }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
          >
            <div className="absolute top-0 h-1 w-4 bg-gray-500 rounded" />
          </motion.div>

          {/* Knife */}
          <motion.div
            className="absolute w-2 h-10 bg-gray-500 rounded"
            style={{ transform: "rotate(-45deg)", top: "35%", right: "60%" }}
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>

    </div>
  );
};

export default Loader;
