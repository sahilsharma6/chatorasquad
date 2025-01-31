import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

function transformOrders(orders) {
  const result = {};

  orders.forEach(order => {
    // Extract the date in YYYY-MM-DD format
    const date = new Date(order.date).toISOString().split('T')[0];
    const paymentStatus = order.paymentStatus;

    // Initialize the result object for the date if it doesn't exist
    if (!result[date]) {
      result[date] = {
        date: date,
        paymentStatus: {
          Pending: 0,
          Paid: 0,
          Failed: 0
        }
      };
    }

    // Increment the count based on the payment status
    if (paymentStatus === 'completed') {
      result[date].paymentStatus.Paid++;
    } else if (paymentStatus === 'cancelled') {
      result[date].paymentStatus.Failed++;
    } else {
      result[date].paymentStatus.Pending++; 
    }
  });

  // Convert the result object into an array
  return Object.values(result);
}
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
const getDate=getCurrentMonthStartAndEnd()
const PaymentRadarChart = ({transformData}) => {
  const rawData = transformOrders(transformData)

  const [dateRange, setDateRange] = useState([new Date(getDate.start), new Date(getDate.end)]);
  const [startDate, endDate] = dateRange;
console.log(rawData);

  const filteredData = rawData
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      return (!startDate || entryDate >= startDate) && (!endDate || entryDate <= endDate);
    })
    .reduce(
      (acc, entry) => {
        const { Pending, Paid, Failed } = entry.paymentStatus;
        acc.Pending += Pending;
        acc.Paid += Paid;
        acc.Failed += Failed;
        return acc;
      },
      { Pending: 0, Paid: 0, Failed: 0 }
    );

  // Transform aggregated data for RadarChart
  const chartData = [
    { status: "Pending", count: filteredData.Pending },
    { status: "Paid", count: filteredData.Paid },
    { status: "Failed", count: filteredData.Failed },
  ];

  return (
    <div className="p-6 bg-gray-100  mx-auto ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Payment Status Radar Chart
      </h1>

      {/* Date Range Filters with DatePicker */}
      <div className="flex gap-4 mb-6 items-center">
        <DatePicker
          selected={startDate}
          onChange={(dates) => setDateRange(dates)}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          className="border border-orange-500 p-2 rounded"
        />
      </div>

      {/* Animated Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <RadarChart
          outerRadius={90}
          width={400}
          height={400}
          data={chartData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="status" />
          <PolarRadiusAxis />
          <Radar
            name="Payment Status"
            dataKey="count"
            stroke="#f97316"
            fill="#fb923c"
            fillOpacity={0.6}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </motion.div>
    </div>
  );
};

export default PaymentRadarChart;
