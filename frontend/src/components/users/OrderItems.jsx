// OrderItems.js
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import OrderItem from './OrderItem';

const OrderItems = ({ filteredOrders }) => {
  return (
    <div className="p-4">
      <AnimatePresence>
        {filteredOrders.map((order,index) => (
          <OrderItem key={order.id} order={order} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default OrderItems;