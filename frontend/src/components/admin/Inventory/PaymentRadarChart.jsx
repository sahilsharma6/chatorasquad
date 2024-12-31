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

const PaymentRadarChart = () => {
  const rawData = [
    {
      date: "2024-12-20",
      paymentStatus: { Pending: 10, Paid: 50, Failed: 5 },
    },
    {
      date: "2024-12-21",
      paymentStatus: { Pending: 20, Paid: 30, Failed: 10 },
    },
    {
      date: "2024-12-22",
      paymentStatus: { Pending: 15, Paid: 40, Failed: 8 },
    },
  ];

  const [dateRange, setDateRange] = useState([new Date("2024-12-10"), new Date("2024-12-30")]);
  const [startDate, endDate] = dateRange;

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
