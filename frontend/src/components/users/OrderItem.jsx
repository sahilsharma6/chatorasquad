import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Clock, MapPin, Package, Star } from "lucide-react";

const OrderItem = ({ order, index }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      'On the way': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Returned': 'bg-yellow-100 text-yellow-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };
  return (
   <div key={order._id} className="mb-6">
                     {order.items?.map((item, itemIndex) => (
                       <motion.div
                         key={item._id}
                         variants={cardVariants}
                         initial="hidden"
                         animate="visible"
                         whileHover="hover"
                         custom={itemIndex }
                         className="bg-white rounded-xl shadow-lg mb-4 overflow-hidden transition-all duration-300"
                       >
                         <div className="p-6">
                           <div className="flex items-start space-x-4 flex-wrap">
                             <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                               <img
                                 src={import.meta.env.VITE_API_URL + '/' + (item.image || 'placeholder.jpg')}
                                 alt={item.name}
                                 className="w-full h-full object-cover"
                                 loading="lazy"
                               />
                             </div>
   
                             <div className="flex-1 space-y-3">
                               <div>
                                 <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                 <div className="flex items-center space-x-2 mt-1">
                                   <Clock className="w-4 h-4 text-gray-400" />
                                   <p className="text-sm text-gray-500">
                                     {new Date(order.date).toLocaleDateString()} at {order.time}
                                   </p>
                                 </div>
                               </div>
   
                               <div className="flex items-center justify-between flex-wrap">
                                 <div className="space-y-1">
                                   <p className="text-2xl font-bold text-orange-500">
                                     ₹{(item.price * item.quantity).toLocaleString()}
                                   </p>
                                   <p className="text-sm text-gray-500">
                                     ₹{item.price.toLocaleString()} × {item.quantity} items
                                   </p>
                                 </div>
                                 <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                                   {order.orderStatus}
                                 </span>
                               </div>
   
                               <div className="flex items-center space-x-4 pt-2 flex-wrap">
                                 <div className="flex items-center space-x-1">
                                   <Package className="w-4 h-4 text-gray-400" />
                                   <span className="text-sm text-gray-500">Order #{order._id.slice(-6)}</span>
                                 </div>
                                 <div className="flex items-center space-x-1">
                                   <MapPin className="w-4 h-4 text-gray-400" />
                                   <span className="text-sm text-gray-500">Tracking available</span>
                                 </div>
                               </div>
                             </div>
   
                             <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                               <ChevronRight className="text-gray-400 w-6 h-6" />
                             </button>
                           </div>
                         </div>
                       </motion.div>
                     ))}
                   </div>
  );
};

export default OrderItem;
