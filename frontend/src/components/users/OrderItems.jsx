import React from 'react';
import { AnimatePresence } from 'framer-motion';
import OrderItem from './OrderItem';
import { Package } from 'lucide-react';
import {Link} from 'react-router-dom'

const OrderItems = ({ filteredOrders, searchQuery ,isMobile}) => {

  // const filteredOrders = orders.filter(order => 
  //   order.items[0]?.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
console.log(filteredOrders);

  return (
    // <div className="p-4">
      <div className={`flex-1 ${!isMobile ? 'ml-4' : ''}`}>
        <AnimatePresence >
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {searchQuery ? 'Try adjusting your search or filters' : 'Your orders will appear here'}
                </p>
              </div>
            ) : (
              
              filteredOrders.map((order, orderIndex) => (
                <Link to={'/order/details/'+order._id} key={orderIndex}>
            <OrderItem key={order._id} order={order} index={orderIndex} />
          </Link>
          ))
        )}</AnimatePresence>
        </div>
    // </div>
  );
};

export default OrderItems;
