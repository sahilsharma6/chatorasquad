import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Plus } from 'lucide-react';
import apiClient from '../../../services/apiClient';
import Data from './TableData';
import { Pagination } from '../../Pagination';

const OrdersTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'Date', direction: 'descending' });
  const [getOrder, setOrder] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalOrderPage,setTotalOrderPage]=useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiClient.get(`/admin/orders?page=${currentPage}&limit=${itemsPerPage}`);
        console.log(response.data);
        if (response.data) {
          setCurrentPage(response.data.currentPage);
          setTotalOrderPage(response.data.totalPages);
          setOrder(response.data.orders);
          setTotalOrders(response.data.totalOrders); // Set total orders for pagination
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };
    fetchOrder();
  }, [currentPage]); // Fetch orders whenever currentPage changes

  const data = getOrder.flatMap(order => 
    order.items.map(item => ({
      id: order._id, // Using order ID as a unique identifier
      item: item._id, // Using item ID as a unique identifier
      DishesName: item.name, // Name of the item
      Name: `${order.userId.firstName} ${order.userId.lastName}`, // Full name of the user
      email: order.userId.email, // User email
      value: item.price * item.quantity, // Total value for the item
      Date: order.date.split('T')[0], // Extracting date in 'YYYY-MM-DD' format
      status: order.orderStatus, // Order status
      userId: order.userId._id, // User ID
      phone: order.userId.phoneNo,
      paymentStatus:order.paymentStatus, // Assuming phoneNo exists in userId
      quantity:item.quantity
    }))
  );
  console.log(data);
  

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

  // Slice the sorted data for the current page
  // const startIndex = (currentPage - 1) * data.length;
  // const paginatedData = sortedData.slice(startIndex, startIndex + data.length);
  // const totalPages = totalOrderPage; // Calculate total pages based on total orders

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

      <div className="mb-4 flex justify-between items-center flex-wrap gap-3">
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

      <Data handleSort={handleSort} paginatedData={sortedData} />

      <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
        <div className="text-sm text-gray-500">
          Showing {currentPage} to {totalOrderPage} entries
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalOrderPage} />
      </div>
    </div>
  );
};

export default OrdersTable;