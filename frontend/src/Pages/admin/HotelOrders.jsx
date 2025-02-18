import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, Check, X, AlertCircle, Clock } from 'lucide-react';

const HotelOrders= ()=>{
     // Sample data
  const initialOrders = [
    {
      id: '67a37edb93f167c2b7f4eeaa',
      dishName: 'Des French Fries',
      roomName: '301',
      hotelName: 'Grand Plaza',
      value: 578,
      date: '2025-02-05',
      time: '14:30',
      orderStatus: 'Delivered',
      paymentStatus: 'completed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543210'
    },
    {
      id: '67a37edb93f167c2b7f4eeab',
      dishName: 'Dessert Brownies',
      roomName: '205',
      hotelName: 'Sunset Resort',
      value: 1398,
      date: '2025-02-05',
      time: '15:45',
      orderStatus: 'Delivered',
      paymentStatus: 'completed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543211'
    },
    {
      id: '67a373e893f167c2b7f4e9f5',
      dishName: 'Desi Samosas with chutni',
      roomName: '102',
      hotelName: 'Royal Suites',
      value: 50,
      date: '2025-02-05',
      time: '12:15',
      orderStatus: 'Confirm',
      paymentStatus: 'failed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543212'
    },
    {
      id: '67a37267a3f167c2b7f4e872',
      dishName: 'Des Spaghetti Aglio e Olio',
      roomName: '405',
      hotelName: 'Grand Plaza',
      value: 299,
      date: '2025-02-05',
      time: '16:30',
      orderStatus: 'Delivered',
      paymentStatus: 'completed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543213'
    },
    {
      id: '67a3710a93f167c2b7f4e6d6',
      dishName: 'Dessert Tiramisu',
      roomName: '506',
      hotelName: 'Ocean View',
      value: 599,
      date: '2025-02-05',
      time: '18:00',
      orderStatus: 'Pending',
      paymentStatus: 'failed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543214'
    },
    {
      id: '67a370a893f167c2b7f4e686',
      dishName: 'Desi Samosas with chutni',
      roomName: '201',
      hotelName: 'Royal Suites',
      value: 50,
      date: '2025-02-05',
      time: '13:45',
      orderStatus: 'Confirm',
      paymentStatus: 'failed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543215'
    }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Sort function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtered and sorted orders
  const getFilteredAndSortedOrders = () => {
    let filteredOrders = [...orders];
    
    // Apply search filter
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(order => 
        order.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.includes(searchTerm) ||
        order.time.includes(searchTerm) ||
        order.value.toString().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredOrders;
  };

  // Handle order status update
  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? {...order, orderStatus: newStatus} : order
    ));
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getFilteredAndSortedOrders().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(getFilteredAndSortedOrders().length / itemsPerPage);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-500 to-yellow-600">
          <h1 className="text-2xl font-bold text-white">Order Management System</h1>
          <p className="text-blue-100 mt-2">Manage hotel and room orders efficiently</p>
        </div>
        
        {/* Search and Filter */}
        <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by dish, room, hotel..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, getFilteredAndSortedOrders().length)} of {getFilteredAndSortedOrders().length} entries
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #Item
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('dishName')}
                >
                  <div className="flex items-center">
                    Dish Name
                    <ArrowUpDown size={16} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('roomName')}
                >
                  <div className="flex items-center">
                    Room Name
                    <ArrowUpDown size={16} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('hotelName')}
                >
                  <div className="flex items-center">
                    Hotel Name
                    <ArrowUpDown size={16} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('value')}
                >
                  <div className="flex items-center">
                    Value (₹)
                    <ArrowUpDown size={16} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('date')}
                >
                  <div className="flex items-center">
                    Date & Time
                    <ArrowUpDown size={16} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Status
                </th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th> */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((order, index) => (
                <motion.tr 
                  key={order.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="font-mono">{order.id.substring(0, 8)}...</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.dishName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.roomName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.hotelName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{order.date}</div>
                    <div className="text-xs text-gray-400">{order.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        order.orderStatus === 'Confirm' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <select 
                        className="text-xs border rounded p-1 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirm">Confirm</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View */}
        <motion.div 
          className="md:hidden px-4 py-2 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {currentItems.map((order, index) => (
            <motion.div 
              key={order.id}
              variants={itemVariants}
              custom={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.dishName}</h3>
                    <p className="text-sm text-gray-600">
                      Room: {order.roomName} | Hotel: {order.hotelName}
                    </p>
                  </div>
                  <span className={`px-2 text-xs leading-5 font-semibold rounded-full
                    ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.orderStatus === 'Confirm' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              <div className="px-4 py-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ID:</span>
                  <span className="text-sm font-mono text-gray-900">{order.id.substring(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Value:</span>
                  <span className="text-sm font-medium text-gray-900">₹{order.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Date & Time:</span>
                  <span className="text-sm text-gray-900">{order.date}, {order.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment:</span>
                  <span className={`text-sm font-medium ${order.paymentStatus === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm text-gray-900">{order.phoneNo}</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">Update Status:</label>
                <select 
                  className="w-full text-sm border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:orange-blue-500"
                  value={order.orderStatus}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirm">Confirm</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex justify-between items-center border-t">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border ${currentPage === 1 
              ? 'text-gray-400 border-gray-200' 
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  currentPage === index + 1
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border ${currentPage === totalPages 
              ? 'text-gray-400 border-gray-200' 
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default HotelOrders;
