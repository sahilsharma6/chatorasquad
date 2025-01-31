import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SparklineChart = ({ data }) => {
  const today = new Date();
  const [dateRange, setDateRange] = useState([new Date(today.getFullYear(), today.getMonth(), 1),  new Date(today.getFullYear(), today.getMonth() + 1, 0)]);
  const [filteredData, setFilteredData] = useState(data);
console.log(dateRange);

  const handleDateChange = (range) => {
    setDateRange(range);

    if (range[0] && range[1]) {
      const start = new Date(range[0]).getTime();
      const end = new Date(range[1]).getTime();

      const updatedData = data.filter((item) => {
        const itemDate = new Date(item.date).getTime();
        // console.log(range);
        
        return itemDate >= start && itemDate <= end;
      });

      setFilteredData(updatedData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white rounded-lg shadow-lg mt-8 mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Offer vs Price vs Date </h2>

      {/* Date Range Picker */}
      <div className="flex items-center gap-4 mb-6">
        <DatePicker
          selectsRange
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={handleDateChange}
          placeholderText="Filter by Date Range"
          className="border rounded-lg px-4 py-4 w-full "
        />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
           content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div className="custom-tooltip">
                  <p className="text-orange-500">{`Date: ${payload[0].payload.date}`}</p>
                  <p className="text-orange-500">{`discount: ${payload[0].payload.offer
                  }%`}</p>
                  <p  className="text-orange-500">{`Price: ₹${payload[1].payload.price}`}</p>
                </div>
              );
            }
            return null;
          }} 
          />
          <Line type="monotone" dataKey="price" stroke="yellow" strokeWidth={6} dot={false} activeDot={{r:8}}  />
          <Line type="monotone" dataKey="offer" stroke="orange" strokeWidth={6} dot={false} activeDot={{r:8}}  />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SparklineChart;
