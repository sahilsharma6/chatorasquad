
// export default OrdersPage;
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {   Filter,   } from 'lucide-react';
import { UserContext } from "../../context/UserContext";
import apiClient from "../../services/apiClient";
import OrderItems from '../../components/users/OrderItems';
import OrderFilters from '../../components/users/OrderFilters';
import OrderSearchBar from '../../components/users/OrderSearchBar';
import FilterContent from '../../components/users/OrderFilterContent';

const OrdersPage = () => {
  const { user } = useContext(UserContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    time: []
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get(`/user/getallorders/${user?._id}`); 
      if (response.status === 200) {
        let data = response.data.orders;
        console.log(data);
        
        if (data) {
          const getOrderDetail = await Promise.all(data.map(async (order) => {
            const itemsWithDetails = await Promise.all(order.items.map(async (item) => {
              const itemResponse = await apiClient.get('/menu/getdetails/' + item.itemid);
              if (itemResponse.status === 200) {
                return {
                  ...item,
                  image: itemResponse.data.images?.[0] 
                };
              }
              return item;
            }));
  
            return {
              ...order,
              items: itemsWithDetails
            };
          }));
  
          setOrders(getOrderDetail || []);
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (user?._id) { 
      fetchOrders();
    }
  }, [user]);

  const statusFilters = ['On the way', 'Delivered', 'Cancelled', 'Returned'];
  const timeFilters = ['Last 30 days','2025', '2024', '2023', 'Older'];


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

  
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = filters.status.length === 0 || filters.status.includes(order.orderStatus);
      const matchesTime = filters.time.length === 0 || filters.time.includes(new Date(order.date).getFullYear().toString());
      const matchesSearch = order.items?.some(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchesStatus && matchesTime && matchesSearch;
    });
  }, [orders, filters, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="sticky top-0 bg-white border-b z-10 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 flex items-center space-x-3 flex-wrap">
           <OrderSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {isMobile && (
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-1 px-4 py-2 border rounded-lg border-orange-500 text-orange-500 hover:bg-orange-50 transition"
              >
                <Filter size={26} />
                <span>Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto p-6">
        <div className="flex gap-6">
          {/* Desktop Filters */}
          {!isMobile && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 bg-white p-4 rounded-lg shadow-md hidden md:block sticky top-24 h-fit "
            >
              <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-lg font-semibold">Filters</h2>
                {(filters.status.length > 0 || filters.time.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterContent timeFilters={timeFilters} toggleFilter={toggleFilter} statusFilters={statusFilters} filters={filters}  />
            </motion.div>
          )}

          {/* Orders List */}
          <OrderItems filteredOrders={filteredOrders} searchQuery={searchQuery}/>
         
        </div>
      </div>

      {/* Mobile Filter Modal */}
    <OrderFilters isMobile={isMobile} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} statusFilters={statusFilters} timeFilters={timeFilters} clearFilters={clearFilters} filters={filters} toggleFilter={toggleFilter}  />
    </div>
  );
};

export default OrdersPage;