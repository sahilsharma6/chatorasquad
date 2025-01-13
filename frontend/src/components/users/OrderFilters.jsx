// Filters.js
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X,ListFilter  } from 'lucide-react';
import FilterContent from './OrderFilterContent';


const OrderFilters = ({ isMobile, filters, toggleFilter, clearFilters, statusFilters, timeFilters, isFilterOpen, setIsFilterOpen }) => {
  
  return (
   <AnimatePresence>
           {isMobile && isFilterOpen && (
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
                 <div className="flex flex-col h-full ">
                   <div className="p-4 border-b flex justify-between items-center">
                     <h2 className="text-lg font-semibold">Filters</h2>
                     <button 
                       onClick={() => setIsFilterOpen(false)}
                       className="p-2 hover:bg-gray-100 rounded-full"
                     >
                       <X size={24} />
                     </button>
                   </div>
   
                   <div className="flex-1 overflow-y-auto p-4">
                     <FilterContent timeFilters={timeFilters} filters={filters} statusFilters={statusFilters} toggleFilter={toggleFilter} />
                   </div>
   
                   <div className="p-4 border-t flex space-x-3">
                     <button 
                       onClick={clearFilters}
                       className="flex-1 py-3 px-4 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition"
                     >
                       Clear Filter
                     </button>
                     <button
                       onClick={() => setIsFilterOpen(false)}
                       className="flex-1 py-3 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                     >
                       Apply
                     </button>
                   </div>
                 </div>
               </motion.div>
             </>
           )}
         </AnimatePresence>
  );
};

export default OrderFilters;