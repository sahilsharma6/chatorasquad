import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, Check, X, AlertCircle, Clock } from 'lucide-react';
import SearchFilter from '../../components/admin/HotelOrders/SearchFilter';
import HotelOrderTable from '../../components/admin/HotelOrders/HotelOrderTable';
import OrdersCard from '../../components/admin/HotelOrders/OrdersCard';
import apiClient from '../../services/apiClient';
import {toast, ToastContainer} from 'react-toastify'

const HotelOrders= ()=>{
     // Sample data
 
  const transformOrders = (orders) => {
    return orders.map(order => {
        // Extracting hotel and room details
        const hotelName = order.hotelId.name; // Get hotel name
        const roomName = order.roomId.room; // Get room number
        // Extracting customer details (assuming `name` and `phoneNo` are in the order)
        const customerName = order.name || 'Unknown'; // Fallback if name is not provided
        const phoneNo = order.phoneNo || 'N/A'; // Fallback if phone number is not provided
        // Extracting dish names and total value
        const dishNames = order.orderItems.map(item => item.menuItem ? item.menuItem.name : 'Unknown Dish');
        const totalValue = order.totalPrice;
        // Formatting date and time
        const orderDate = new Date(order.orderDate);
        const formattedDate = orderDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedTime = orderDate.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
        // Determining order status
        const orderStatus = order.status;
        return {
            id: order._id,
            dishName: dishNames,
            roomName: roomName,
            hotelName: hotelName,
            value: totalValue,
            date: formattedDate,
            time: formattedTime,
            orderStatus: orderStatus,
            paymentStatus: 'completed', // Assuming payment status is always completed for example
            customerName: customerName,
            email: 'admin@example.com', // Placeholder since email is not part of the original data
            phoneNo: phoneNo,
        };
    });
};
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem,setSelectedItem]=useState([])
  const [isOpen,setIsOpen]=useState(false)
  const [itemsPerPage] = useState(5);

  useEffect(()=>{
    try {
      async function fetchHotelOrders(){
        const response = await apiClient.get('/admin/order');
        console.log(response.data);
        setOrders(transformOrders(response.data.orders));
        // setOrders(data);
        
      }
      fetchHotelOrders();
    } catch (error) {
      
    }
  },[])
  console.log(orders);
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
        order.dishName.some(it => it.toLowerCase().includes(searchTerm.toLowerCase())) ||
        order.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.includes(searchTerm) ||
        order.time.includes(searchTerm) ||
        order.value.toString().includes(searchTerm) ||
        order.phoneNo.toString().includes(searchTerm) ||
        order.customerName.toString().includes(searchTerm) 
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
  const updateOrderStatus =async (id, newStatus) => {
    try {
      const res=await apiClient.put(`/admin/statuschange/${id}`,{status:newStatus});
      if(!res.data){
        toast.error('Order status update failed', { position: 'top-right' });
        return;
       }
          setOrders(orders.map(order => 
      order.id === id ? {...order, orderStatus: newStatus} : order
    ));
    toast.success('Order status updated successfully', { position: 'top-right' });
    } catch (error) {
      toast.error('Order status update failed', { position: 'top-right' });
    }

  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getFilteredAndSortedOrders().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(getFilteredAndSortedOrders().length / itemsPerPage);


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
    <div className="bg-gray-50 min-h-screen py-4">
      <ToastContainer />
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
      
        
        {/* Search and Filter */}
       <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} indexOfFirstItem={indexOfFirstItem} indexOfLastItem={indexOfFirstItem} getFilteredAndSortedOrders={getFilteredAndSortedOrders} />
        
        {/* Desktop Table View */}
       <HotelOrderTable requestSort={requestSort} currentItems={currentItems} updateOrderStatus={updateOrderStatus} itemVariants={itemVariants} />
        
        {/* Mobile Card View */}
       <OrdersCard currentItems={currentItems} updateOrderStatus={updateOrderStatus} itemVariants={itemVariants} />
        
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
