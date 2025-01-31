import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import CustomerTablemodal from '../../components/admin/Customer/CustomerTableModal';
import CustomerTable from '../../components/admin/Customer/CustomerTable';
import CustomerCard from '../../components/admin/Customer/CustomerCard';
import CustomerPagination from '../../components/admin/Customer/CustomerPagination';
import CustomerBarChart from '../../components/admin/Customer/CustomerBarChart';
import apiClient from '../../services/apiClient'; 
import { ToastContainer, toast } from 'react-toastify';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 3;

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get('/admin/allusers');
        setCustomers(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to fetch customers.');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

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
      filtered = filtered.filter(item =>
        item.createdAt.includes(dateFilter)
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
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
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

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <>
            {/* Desktop Table */}
            <CustomerTable
              setSelectedCustomer={setSelectedCustomer}
              setShowModal={setShowModal}
              sortConfig={sortConfig}
              currentData={currentData}
              sortData={sortData}
            />

            {/* Mobile Cards */}
            <CustomerCard
              currentData={currentData}
              setSelectedCustomer={setSelectedCustomer}
              setShowModal={setShowModal}
            />

            {/* Pagination */}
            <CustomerPagination
              setCurrentPage={setCurrentPage}
              filteredAndSortedData={filteredAndSortedData}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />

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
          </>
        )}
      </div>

      {/* Bar Chart */}
      <CustomerBarChart customers={customers} />
    </>
  );
};

export default CustomerList;
