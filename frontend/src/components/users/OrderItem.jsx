// OrderItem.js
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';

const OrderItem = ({ order,index }) => {
  return (
    <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-100 rounded-lg shadow mb-4 p-4"
                  >
                    <div className="flex items-start space-x-4 flex-wrap">
                      <img
                        src={order.image}
                        alt={order.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start flex-wrap">
                          <div>
                            <h3 className="font-medium">{order.name}</h3>
                            <p className="text-sm text-gray-500">Type: {order.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{order.price}</p>
                            <div className={`inline-flex items-center space-x-1 mt-1 px-2 py-1 rounded ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              <span className="text-sm">{order.status} on {order.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{order.message}</p>
                        {order.status === 'Delivered' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center space-x-1 text-blue-500 mt-2"
                          >
                            <Star size={16} />
                            <span className="text-sm">Rate & Review The Dishes</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
  );
};

export default OrderItem;