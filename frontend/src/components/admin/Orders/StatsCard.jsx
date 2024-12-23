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
          <Icon className={`${color} w-6 h-6`} />
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
        <span className="text-sm text-gray-600">Higher than last month</span>
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

const StatsDashboard = () => {
  const stats = [
    {
      title: 'New',
      value: '500',
      percentage: '24',
      icon: Box,
      iconBg: 'bg-yellow-600',
      color: 'text-white'
    },
    {
      title: 'Delivered',
      value: '900',
      percentage: '45',
      icon: BarChart,
      iconBg: 'bg-yellow-600',
      color: 'text-white'
    },
    {
      title: 'Refund',
      value: '900',
      percentage: '32',
      icon: FileText,
      iconBg: 'bg-yellow-600',
      color: 'text-white'
    },
    {
      title: 'Cancelled',
      value: '200',
      percentage: '28',
      icon: Calendar,
      iconBg: 'bg-red-800',
      color: 'text-white'
    }
  ];

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