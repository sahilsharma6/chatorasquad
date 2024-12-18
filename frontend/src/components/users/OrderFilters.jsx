// Filters.js
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X,ListFilter  } from 'lucide-react';

const Filters = ({ isMobile, filters, toggleFilter, clearFilters, statusFilters, timeFilters, isFilterOpen, setIsFilterOpen }) => {
  return (
    <>
      {isMobile ? (
        // Mobile Filter Modal
        <>
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setIsFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween' }}
                  className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50"
                >
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Filters</h2>
                      <button onClick={() => setIsFilterOpen(false)}>
                        <X size={24} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-3">Order Status</h3>
                        <div className="flex flex-wrap gap-2">
                          {statusFilters.map(status => (
                            <button
                              key={status}
                              onClick={() => toggleFilter('status', status)}
                              className={`px-4 py-2 rounded-full text-sm ${filters.status.includes(status) ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold mb-3">Order Time</h3>
                        <div className="flex flex-wrap gap-2">
                          {timeFilters.map(time => (
                            <button
                              key={time}
                              onClick={() => toggleFilter('time', time)}
                              className={`px-4 py-2 rounded-full text-sm ${filters.time.includes(time) ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t flex space-x-3">
                      <button
                        onClick={clearFilters}
                        className="flex-1 py-3 text-yellow-500 border border-order-500 rounded-lg"
                      >
                        Clear Filter
                      </button>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 py-3 bg-yellow-500 text-white rounded-lg"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      ) : (
        // Desktop Filters
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 sticky p-4 rounded-lg shadow-md bg-yellow-50"
        >
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2"> ORDER STATUS</h3>
            {statusFilters.map(status => (
              <label key={status} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 accent-yellow-500 text-white w-4 h-4 hover:cursor-pointer"
                  checked={filters.status.includes(status)}
                  onChange={() => toggleFilter('status', status)}
                />
                <span className="text-sm">{status}</span>
              </label>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">ORDER TIME</h3>
            {timeFilters.map(time => (
              <label key={time} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 accent-yellow-500 w-4 h-4"
                  checked={filters.time.includes(time)}
                  onChange={() => toggleFilter('time', time)}
                />
                <span className="text-sm">{time}</span>
              </label>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Filters;