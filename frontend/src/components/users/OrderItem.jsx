import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";

const OrderItem = ({ order, index }) => {
  return (
    <motion.div
      key={order._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-100 rounded-lg shadow mb-4 p-4"
    >
      <div className="flex items-start space-x-4 flex-wrap">
        {/* <img
          src={import.meta.env.VITE_API_URL + "/" + order?.items[0]?.itemid}
          alt={order?.items[0]?.name}
          className="w-20 h-20 object-cover rounded"
        /> */}

        <div className="flex-1">
          <div className="flex justify-between items-start flex-wrap">
            <div>
              <h3 className="font-medium">
                {order.items[0]?.name} (Qty: {order.items[0]?.quantity})
              </h3>
              <p className="text-sm text-gray-500">
                Order Status: {order.orderStatus}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">₹{order.total}</p>
              <div
                className={`inline-flex items-center space-x-1 mt-1 px-2 py-1 rounded ${
                  order.paymentStatus === "completed"
                    ? "bg-green-100 text-green-800"
                    : order.paymentStatus === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <span className="text-sm">
                  Payment Status: {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Delivered to: {order.deliveryAddress}</p>
          <p className="text-sm text-gray-600 mt-1">
            Order Date: {new Date(order.date).toLocaleString()}
          </p>
          {order.orderStatus === "pending" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-1 text-blue-500 mt-2"
            >
              <ChevronRight size={16} />
              <span className="text-sm">Track Order</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderItem;
