import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (value.trim()) {
      console.log(`Searching for: ${value}`);
    
    }
  };

  return (
    
    <div className="flex items-center justify-center w-full max-w-4xl mx-auto p-4">
      <div className="flex w-full bg-white rounded-lg border border-gray-200 shadow">
        <motion.div
          className="relative flex-grow flex items-center rounded-l-lg px-4 py-2"
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
        >
          <Search className="w-5 h-5 text-gray-400" />

          <motion.input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-grow px-3 py-2 text-lg outline-none bg-transparent"
            placeholder="Search"
          />

          <AnimatePresence>
            {value && (
              <motion.button
                onClick={() => setValue('')}
                className="focus:outline-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1.1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="absolute inset-0 rounded-l-lg border-2 border-orange-500"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          onClick={handleSearch}
          className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default SearchBar;
