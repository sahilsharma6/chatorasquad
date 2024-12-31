import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Search } from 'lucide-react';
import CustomerTablemodal from '../../components/admin/Customer/CustomerTableModal';
import CustomerTable from '../../components/admin/Customer/CustomerTable';
import CustomerCard from '../../components/admin/Customer/CustomerCard';
import CustomerPagination from '../../components/admin/Customer/CustomerPagination';
import CustomerBarChart from '../../components/admin/Customer/CustomerBarChart';

const CustomerList = () => {
  const [customers, setCustomers] = useState([
    {
        id: 1,
        firstName: 'Cindy',
        lastName: 'Maity',
        phone: '+1 987 675 5432',
        email: 'example@email.com',
        created: '12 June 2022 12:30 pm',
        age: 18,
        gender: 'Female'
    },
    {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1 234 567 8901',
        email: 'john.doe@email.com',
        created: '15 March 2024 10:15 am',
        age: 25,
        gender: 'Male'
    },
    {
        id: 3,
        firstName: 'Alice',
        lastName: 'Smith',
        phone: '+1 345 678 9012',
        email: 'alice.smith@email.com',
        created: '22 January 2024 09:45 am',
        age: 30,
        gender: 'Female'
    },
    {
        id: 4,
        firstName: 'Bob',
        lastName: 'Johnson',
        phone: '+1 456 789 0123',
        email: 'bob.johnson@email.com',
        created: '5 February 2023 03:00 pm',
        age: 22,
        gender: 'Male'
    },
    {
        id: 5,
        firstName: 'Emma',
        lastName: 'Brown',
        phone: '+1 567 890 1234',
        email: 'emma.brown@email.com',
        created: '30 April 2024 11:20 am',
        age: 28,
        gender: 'Female'
    },
    {
        id: 6,
        firstName: 'Michael',
        lastName: 'Davis',
        phone: '+1 678 901 2345',
        email: 'michael.davis@email.com',
        created: '18 August 2023 02:10 pm',
        age: 35,
        gender: 'Male'
    },
    {
        id: 7,
        firstName: 'Sophia',
        lastName: 'Wilson',
        phone: '+1 789 012 3456',
        email: 'sophia.wilson@email.com',
        created: '25 December 2024 04:30 pm',
        age: 27,
        gender: 'Female'
    },
    {
        id: 8,
        firstName: 'James',
        lastName: 'Taylor',
        phone: '+1 890 123 4567',
        email: 'james.taylor@email.com',
        created: '25 December 2024 08:00 am',
        age: 40,
        gender: 'Male'
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 3;

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = React.useMemo(() => {
    let filtered = [...customers];
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        Object.values(item).some(val =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (dateFilter) {
        console.log(dateFilter);
        
      filtered = filtered.filter(item =>
        item.created.includes(dateFilter)
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [customers, sortConfig, searchTerm, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const currentData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
   
    <div className="p-4 max-w-full shadow-lg mx-auto rounded-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Customer List</h1>
        <button className="px-4 py-2 bg-oorange-500 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors">
          Add New
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search here..."
            className="pl-10 w-full p-2 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <input
          type="date"
          className="w-full md:w-48 p-2 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Desktop Table */}
     <CustomerTable setSelectedCustomer={setSelectedCustomer} setShowModal={setShowModal} sortConfig={sortConfig} currentData={currentData} sortData={sortData}  />

      {/* Mobile Cards */}
      <CustomerCard currentData={currentData} setSelectedCustomer={setSelectedCustomer} setShowModal={setShowModal} />

      {/* Pagination */}
      <CustomerPagination setCurrentPage={setCurrentPage} filteredAndSortedData={filteredAndSortedData} itemsPerPage={itemsPerPage} currentPage={currentPage} totalPages={totalPages} />

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <CustomerTablemodal
            isOpen={showModal} 
            onClose={() => {
              setShowModal(false);
              setSelectedCustomer(null);
            }} 
            customer={selectedCustomer} 
          />
        )}
      </AnimatePresence>
    </div> 
    <CustomerBarChart customers={customers} />
    </>
  );
};

export default CustomerList;