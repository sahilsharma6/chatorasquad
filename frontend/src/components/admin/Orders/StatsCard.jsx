import React from 'react';
import { motion } from 'framer-motion';
import { Box, BarChart, FileText, Calendar } from 'lucide-react';

const StatsCard = ({ title, value, percentage, icon: Icon, color, iconBg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`${iconBg} p-3 rounded-full`}>
          <Icon className={` w-12 h-12 bg-yellow-600 text-white  rounded-lg p-2`} />
        </div>
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold"
        >
          {value}
        </motion.span>
      </div>
      
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      
      <div className="flex items-center">
        <span className="text-sm text-gray-600">From All Orders</span>
        <motion.div 
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="ml-2 bg-blue-50 px-2 py-1 rounded-full flex items-center"
        >
          <span className="text-blue-600 text-sm font-medium">{percentage}%</span>
          <svg 
            className="w-4 h-4 text-blue-600 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};
function convertOrdersToOrderData(orders) {
  const orderStatusCount = {};
  const totalOrders = orders.length
  // Count the occurrences of each order status
  orders.forEach(order => {
      const status = order.orderStatus;
      if (!orderStatusCount[status]) {
          orderStatusCount[status] = {
              title: status,
              value: 0,
              color:'text-white', // Function to get color based on status
              icon: getColorForStatus(status),
              date: order.date.split('T')[0] // You can choose to use the latest date or any specific logic to determine the date
          };
      }
      orderStatusCount[status].value += 1;
  });

  for (const status in orderStatusCount) {
    const count = orderStatusCount[status].value;
    orderStatusCount[status].percentage = ((count / totalOrders) * 100).toFixed(2); // Calculate percentage
}
  // Convert the object to an array
  return Object.values(orderStatusCount);
}

function getColorForStatus(status) {
  switch (status) {
      case 'On Delivery':
          return FileText;
      case 'Delivered':
          return BarChart;
      case 'Cancel':
          return Calendar;
      case 'Pending':
          return Box; // Example color for Pending
      default:
          return Box; // Default color
  }
}


const StatsDashboard = ({getOrders}) => {
  const stats =convertOrdersToOrderData(getOrders);

  return (
    <div className="py-4 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: index * 0.1 }
            }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatsDashboard;