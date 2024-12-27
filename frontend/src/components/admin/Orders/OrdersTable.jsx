import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowDownUp } from "react-icons/lu";
import Data from './TableData';
import { Filter, Menu, Plus } from 'lucide-react';

const OrdersTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const itemsPerPage = 3;

  const data = [
    { id: 8, DishesName: 'Implied contract', Name: 'Urban Gallery', email: 'Name@testing.com', phone: '999-000-989-0', value: 44000, Date: '2024-08-22'  ,status:'deliverd'},
    { id: 5, DishesName: 'Unit price contract', Name: 'Trendy Scissor', email: 'Name@testing.com', phone: '222-312-222-9', value: 54000, Date: '2024-06-23'  ,status:'confirm'},
    { id: 9, DishesName: 'Express contract', Name: 'The Spice Route', email: 'Name@testing.com', phone: '554-444-999-3', value: 87000, Date: '2024-04-12' ,status:'confirm' },
    { id: 6, DishesName: 'Bilateral contract', Name: 'The Fresh Breakfast', email: 'Name@testing.com', phone: '772-009-989-1', value: 43000, Date: '2024-01-12' ,status:'deliverd' },
    { id: 13, DishesName: 'Aleatory contract', Name: 'The First Step', email: 'Name@testing.com', phone: '112-222-887-7', value: 62000, Date: '2024-03-12' ,status:'refund' },
    { id: 4, DishesName: 'Time and materials contract', Name: 'Ready Continental', email: 'Name@testing.com', phone: '565-676-889-0', value: 33000, Date: '2024-04-12' ,status:'cancel' },
    { id: 2, DishesName: 'Cost-reimbursement contract', Name: 'Hellow World Kids', email: 'Name@testing.com', phone: '887-332-090-2', value: 25000, Date: '2024-03-21' ,status:'confirm' }
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const filteredData = data.filter(row => 
    Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
const [dt,setData]=useState(data)
  // Slice the sorted data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateOrderStatus = (updatedOrder) => {
    setData((prevData) =>
      prevData.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };
  return (
    <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg py-3 w-full px-2">
        <motion.div className='mb-8'>
        <motion.button
      initial={{ scale: 0.8 }}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className='flex bg-orange-500 text-white px-6 rounded-md gap-2 py-2 text-2xl'
    >
      <span><Plus size={36} /></span>
      <span>Add Order</span>
    </motion.button>
        </motion.div>
         <motion.div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
        initial={{ x: 300 }}
        animate={{ x: isSidebarOpen ? 0 : 300 }}
        exit={{ x: 300 }}
      >
        <h2 className="text-lg font-bold mb-4">Sort Options</h2>
        <button onClick={() => handleSort('DishesName')} className="block mb-2 text-blue-500">Sort by Dishes Name</button>
        <button onClick={() => handleSort('Name')} className="block mb-2 text-blue-500">Sort by Name</button>
        <button onClick={() => handleSort('value')} className="block mb-2 text-blue-500">Sort by Value</button>
        <button onClick={() => handleSort('Date')} className="block mb-2 text-blue-500">Sort by Date</button>
        <button onClick={() => setIsSidebarOpen(false)} className="mt-4 text-red-500">Close</button>
      </motion.div>

      <div className="mb-4 flex justify-between items-center flex-wrap gap-3">
        <div className="space-x-2 flex flex-wrap gap-4">
          {/* Action Buttons */}
          {['Copy', 'CSV', 'Excel', 'PDF', 'Print'].map(action => (
            <motion.button
              key={action}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              {action}
            </motion.button>
          ))}
       { !isSidebarOpen && window.innerWidth <768 ?  (
         <motion.div className='px-4 py-2 bg-gray-100 rounded hover:bg-gray-200'>
           <Filter onClick={()=>setIsSidebarOpen(true)} />
          </motion.div>
        ): null}
        </div>
        <div className="flex items-center">
          <span className="mr-2">Search:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <Data handleSort={handleSort} paginatedData={paginatedData} updateOrderstatus={updateOrderStatus} />

      <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
        <div className="text-sm text-gray-500">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, sortedData.length)} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            disabled={currentPage === 1}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            {currentPage}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            disabled={currentPage === totalPages}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;