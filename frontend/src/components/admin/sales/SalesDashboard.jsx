import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown } from 'lucide-react';
import BipolarChart from './BipolarChart';

const salesData = [
    { date: '2024-12-20', menuSold: 220, revenue: 1500, safe: 300 },
    { date: '2024-12-25', menuSold: 340, revenue: 4500, safe: 900 },
    { date: '2024-12-27', menuSold: 180, revenue: 2300, safe: 460 },
    { date: '2024-12-01', menuSold: 2800, revenue: 37000, safe: 7400 },
    { date: '2024-01-15', menuSold: 4500, revenue: 56000, safe: 11200 },
  ];
  
  const loyalCustomers = [
    { id: 1, name: 'Rudra Maity', orders: 651, image: 'https://media.istockphoto.com/id/1338289824/photo/close-up-image-of-indian-man-with-buzz-cut-hairstyle-to-disguise-receding-hairline-wearing-t.webp?s=1024x1024&w=is&k=20&c=ncFD0yEHzmBFPbiYiHe6ewQtLQa9Y0nA4q8K4ccr7No=' },
    { id: 2, name: 'Ullas Mandal', orders: 366, image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, name: 'Jordi Alaba', orders: 125, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 4, name: 'Kevin Jamet', orders: 78, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  ];
  
  const COLORS = ['#EC4899', '#F59E0B', '#EF4444'];
  
  function filterDataByRange(data, range) {
    const now = new Date();
    let startDate;
  
    switch (range) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'thisWeek':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'thisYear':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0); // Default to all data
    }
  
    return data.filter((item) => new Date(item.date) >= startDate);
  }
  
  export default function SalesDashboard() {
    const [timeFilter, setTimeFilter] = useState('thisMonth');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const filteredData = filterDataByRange(salesData, timeFilter);
  
    const aggregatedData = filteredData.reduce(
      (acc, item) => {
        acc.menuSold += item.menuSold;
        acc.revenue += item.revenue;
        acc.safe += item.safe;
        return acc;
      },
      { menuSold: 0, revenue: 0, safe: 0 }
    );
  
    const pieData = [
      { name: 'Menu Sold', value: aggregatedData.menuSold },
      { name: 'Revenue', value: aggregatedData.revenue },
      { name: 'Safe', value: aggregatedData.safe },
    ];
  
    return (
        <>
      <div className="flex gap-6 p-3 mx-auto bg-gray-50 flex-wrap ">
        {/* Sales Summary Card */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm flex-1 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Sales Summary</h2>
              <p className="text-gray-500 text-sm">Based on {timeFilter.replace('this', '')}</p>
            </div>
  
            <div className="relative">
              <motion.button
                className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {timeFilter.replace('this', '')}
                <ChevronDown />
              </motion.button>
  
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {['today', 'thisWeek', 'thisMonth', 'thisYear'].map((filter) => (
                      <button
                        key={filter}
                        className="block w-full text-left px-4 py-2 hover:bg-orange-500 first:rounded-t-lg last:rounded-b-lg hover:text-white"
                        onClick={() => {
                          setTimeFilter(filter);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {filter.replace('this', '')}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
  
          <div className="flex gap-8 flex-wrap md:flex-row flex-col lg:flex-row">
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-pink-500" />
      <div>
        <div className="text-2xl font-bold">{aggregatedData.menuSold.toLocaleString()}</div>
        <div className="text-gray-500">Menu Sold</div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div>
        <div className="text-2xl font-bold">${aggregatedData.revenue.toLocaleString()}</div>
        <div className="text-gray-500">Revenue</div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div>
        <div className="text-2xl font-bold">${aggregatedData.safe.toLocaleString()}</div>
        <div className="text-gray-500">Safe (20%)</div>
      </div>
    </div>
  </div>

  <div className="flex-1 h-64 md:h-auto">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => [`${value.toLocaleString()}`, name]}
          contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #ccc" }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

        </motion.div>

      {/* Loyal Customers Card */}
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm w-80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-2">Loyal Customers</h2>
        <p className="text-gray-500 text-sm mb-6">Lorem ipsum dolor</p>

        <motion.div 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {loyalCustomers.map((customer) => (
            <motion.div
              key={customer.id}
              className="flex items-center gap-3"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <img
                src={customer.image}
                alt={customer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{customer.name}</h3>
                <p className="text-yellow-500 text-sm">{customer.orders} Times order</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="text-orange-500 text-sm mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View More →
        </motion.button>
      </motion.div>
    </div>
    <BipolarChart />
    </>
  );
}