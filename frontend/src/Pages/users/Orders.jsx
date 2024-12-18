
// OrdersPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ordersData from '../../Data/Orders.json';
import SearchBar from '../../components/users/OrderSearchBar';
import Filters from '../../components/users/OrderFilters';
import OrderItems from '../../components/users/OrderItems';
import { ListFilter } from 'lucide-react';

const OrdersPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState(ordersData);
  const [filters, setFilters] = useState({ status: [], time: [] });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const statusFilters = ['On the way', 'Delivered', 'Cancelled', 'Returned'];
  const timeFilters = ['Last 30 days', '2023', '2022', '2021', '2020'];

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({ status: [], time: [] });
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filters.status.length === 0 || filters.status.includes(order.status);
    const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTime = filters.time.length === 0 || filters.time.some(time => {
      const orderDate = new Date(order.date);
      const currentDate = new Date();
      
      switch (time) {
        case 'Last 30 days':
          return (currentDate - orderDate) <= 30 * 24 * 60 * 60 * 1000;
        case '2023':
          return orderDate.getFullYear() === 2023;
        case '2022':
          return orderDate.getFullYear() === 2022;
        case '2021':
          return orderDate.getFullYear() === 2021;
        case '2020':
          return orderDate.getFullYear() === 2020;
        default:
          return false;
      }
    });
  
    return matchesStatus && matchesSearch && matchesTime;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {isMobile ? (
          <>
            <div className="sticky top-0 bg-white border-b z-10">
              <div className="p-4 flex items-center space-x-3">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center space-x-1 px-3 py-2 border rounded-lg"
                >
                  <span><ListFilter size={33} /> </span>
                </button>
              </div>
            </div>

            <OrderItems filteredOrders={filteredOrders} />

            <Filters 
              isMobile={isMobile} 
              filters={filters} 
              toggleFilter={toggleFilter} 
              clearFilters={clearFilters} 
              statusFilters={statusFilters} 
              timeFilters={timeFilters} 
              isFilterOpen={isFilterOpen} 
              setIsFilterOpen={setIsFilterOpen} 
            />
          </>
        ) : (
          <div className="flex gap-3">
            <Filters 
              isMobile={isMobile} 
              filters={filters} 
              toggleFilter={toggleFilter} 
              clearFilters={clearFilters} 
              statusFilters={statusFilters} 
              timeFilters={timeFilters} 
            />

            <div className="flex-1">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-yellow-50 rounded-lg shadow mb-4"
              >
                <div className="p-4 flex items-center space-x-2">
                  <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                    Search Orders
                  </button>
                </div>
              </motion.div>

              <OrderItems filteredOrders={filteredOrders} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;