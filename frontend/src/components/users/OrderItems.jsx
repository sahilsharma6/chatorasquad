import React from 'react';
import { AnimatePresence } from 'framer-motion';
import OrderItem from './OrderItem';

const OrderItems = ({ orders, searchQuery }) => {

  const filteredOrders = orders.filter(order => 
    order.items[0]?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <AnimatePresence>
        {filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          filteredOrders.map((order, index) => (
            <OrderItem key={order._id} order={order} index={index} />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderItems;
