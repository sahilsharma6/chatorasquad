import { motion } from "framer-motion";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
function getCurrentMonthStartAndEnd() {
  const date = new Date();

  // Start date: First day of the current month
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const startFormatted = startDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  // End date: Last day of the current month
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const endFormatted = endDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  return {
    start: startFormatted,
    end: endFormatted
  };
}

const currentMonthDates = getCurrentMonthStartAndEnd();
function transformOrders(orders) {
  const result = {};

  orders?.forEach(order => {
    const date = new Date(order.date).toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
    const status = order.orderStatus;

    // Initialize the date object if it doesn't exist
    if (!result[date]) {
      result[date] = {
        date: date,
        'Order Cancelled': 0,
        'Order Confirmed': 0,
        'Order Delivered': 0,
        'Order "completed"': 0,
        'Order Returned': 0,
      };
    }

    // Increment the count for the respective status
    if (status === 'Cancel') {
      result[date]['Order Cancelled']++;
    } else if (status === 'Confirm') {
      result[date]['Order Confirmed']++;
    } else if (status === 'Delivered') {
      result[date]['Order Delivered']++;
    } else if (status === 'Dispatched') {
      result[date]['Order Dispatched']++;
    } else if (status === 'Refund') {
      result[date]['Order Returned']++;
    }
  });

  // Convert the result object into an array
  return Object.values(result);
}

export default function OrderBarChart({transformedDt}) {
    const [startDate, setStartDate] = useState(new Date(currentMonthDates.start));
    const [endDate, setEndDate] = useState(new Date(currentMonthDates.end));
    // console.log(transformedDt);
    
  const transformedData= transformOrders(transformedDt)
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