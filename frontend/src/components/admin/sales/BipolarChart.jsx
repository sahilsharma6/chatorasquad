import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BipolarChart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  const salesData = [
    { date: "2024-12-20", sales: 500 },
    { date: "2024-12-21", sales: 300 },
    { date: "2024-12-22", sales: 400 },
    { date: "2024-12-23", sales: 350 },
    { date: "2024-12-24", sales: 600 },
    { date: "2024-12-25", sales: 700 },
    { date: "2024-12-27", sales: 200 },
  ];

  const filteredData = salesData.filter((item) => {
    const itemDate = new Date(item.date);
    const start = new Date(startDate.setHours(0, 0, 0, 0));  // Remove time from startDate
    const end = new Date(endDate.setHours(23, 59, 59, 999)); // Set endDate to the end of the day

    return itemDate >= start && itemDate <= end;
  });
  console.log('dssd',startDate);
  

  return (
    <div className="p-6 bg-white mt-4 shadow-lg rounded-md">
      <h1 className="text-xl my-6 font-bold">Sales Growth</h1>
      {/* Date Picker */}
      <div className="flex gap-4 flex-wrap  mb-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border rounded px-3 py-4 focus:outline-yellow-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border rounded px-3 py-4 focus:outline-yellow-500"
          />
        </div>
      </div>

      {/* Bipolar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value) => `$${value}`}
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
          />
          <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BipolarChart;
