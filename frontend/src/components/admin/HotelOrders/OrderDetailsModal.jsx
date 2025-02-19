import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import apiClient from '../../../services/apiClient';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;
const [orderData,setOrderData]=useState({});
console.log(order);
useEffect(()=>{
    try {
        async function fetchAdminOrderData() {
            const res=await apiClient.get(`/admin/getorderbyId/${order.id}`);
            console.log(res.data);
           setOrderData(res.data.order);
        }
        fetchAdminOrderData();
    } catch (error) {
        
    }
},[])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="bg-white rounded-lg w-full max-w-2xl p-6 space-y-4 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Hotel Information */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-2">Hotel Information</h3>
            <p className="text-gray-700">Hotel Name: {orderData?.hotelId?.name}</p>
            <p className="text-gray-700">Hotel Phone Number: {orderData?.hotelId?.phoneNo || 'N/A'}</p>
            <p className="text-gray-700">Hotel Email : {orderData?.hotelId?.email ||'N/A'}</p>
            <p className="text-gray-700">Hotel Address: {orderData?.hotelId?.address  || 'N/A'}</p>
            <p className="text-gray-700">Room: {orderData?.roomId?.room}</p>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg">Order Items</h3>
            {orderData?.orderItems?.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{item?.menuItem?.name || 'N/A'}</h4>
                    <p className="text-sm text-gray-600">{item?.menuItem?.description || 'N/A'}</p>
                    <p className="text-sm text-gray-600">Type: {item?.menuItem?.type || 'N/A'}</p>
                    <p className="text-sm text-gray-600">Cuisine: {item?.menuItem?.Cuisine || 'N/A'}</p>
                    {/* <p className="text-sm text-gray-600">Offer Date End : {item?.menuItem?.offerDates?.end.split('T')[0]}</p> */}
                  
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      Quantity: {item?.quantity || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: 	₹ {item?.menuItem?.discountedPrice || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                     Seleing Price: 	₹{item?.menuItem?.sellingPrice || 'N/A'}
                    </p>
                   
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
            <div className="space-y-2">
              <p className="text-gray-700">Status: 
                <span className={`ml-2 px-2 py-1 rounded ${
                  orderData?.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {orderData?.status}
                </span>
              </p>
              <p className="text-gray-700">Order Date: {formatDate(orderData?.orderDate)}</p>
              <p className="text-gray-700">Order Customer's Name: {orderData?.name || 'N/A'}</p>
              <p className="text-gray-700">Order Customer's Phone Number: {orderData?.phoneNo || 'N/A'}</p>
              <p className="font-semibold text-lg">Total Price:	₹{orderData?.totalPrice?.toFixed(2)}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetailsModal;