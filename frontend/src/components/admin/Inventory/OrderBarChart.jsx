import { motion } from "framer-motion";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function OrderBarChart({transformedData}) {
    const [startDate, setStartDate] = useState(new Date("2024-12-20"));
    const [endDate, setEndDate] = useState(new Date("2024-12-22"));
  
    const filteredData = transformedData.filter(
      (entry) =>
        new Date(entry.date) >= new Date(startDate) && new Date(entry.date) <= new Date(endDate)
    );
    console.log(filteredData);
    
  
    return (
      <div className=" p-6 bg-gray-100 rounded-lg shadow-md max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Order Status by Date</h2>
        </motion.div>
  
        <div className="mb-4  justify-center ">
          <span className="mr-2">Select Date Range:</span>
          <motion.div initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }} className="flex flex-wrap gap-5">

         
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            className="border p-2 rounded focus:outline-yellow-500 transition-all delay-100"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy-MM-dd"
            className="border p-2 rounded focus:outline-yellow-500 transition-all delay-100"
          /> </motion.div>
        </div>
      <ResponsiveContainer width="100%" height={400}>
    <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Order Returned" stackId="a" fill="#E53E3E" />
      <Bar dataKey="Order Confirmed" stackId="a" fill="#3182CE" />
      <Bar dataKey="Order Dispatched" stackId="a" fill="#ECC94B" />
      <Bar dataKey="Order Delivered" stackId="a" fill="#38A169" />
      <Bar dataKey="Order Cancelled" stackId="a" fill="#805AD5" />
    </BarChart>
  </ResponsiveContainer>
    </div>
  );
}