import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import LineChartComponent from "./LineChartComponent";
import OrderBarChart from "./BarChart";
import apiClient from "../../../services/apiClient";

const convertOrdersData = (orders) => {
  const result = {};

  orders.forEach(order => {
    const date = new Date(order.date).toISOString().split("T")[0]; // Get the date in YYYY-MM-DD format
    const total = order.total;

    if (!result[date]) {
      result[date] = { orders: 0, revenue: 0 };
    }

    result[date].orders += 1; // Increment order count
    result[date].revenue += total; // Add to revenue
  });

  return Object.keys(result).map(date => ({
    date,
    orders: result[date].orders,
    revenue: result[date].revenue
  }));
};

const OrderCharts = () => {
  const today = new Date();
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("This Month");
  const [customRange, setCustomRange] = useState({
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
  });

  const fetchOrderData = async (start, end) => {
    try {
      const res = await apiClient.get(
        `/admin/orders?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
      );
      const orders = convertOrdersData(res.data.orders);
      setFilteredData(orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    // Fetch data whenever customRange or filterType changes
    fetchOrderData(customRange.start, customRange.end);
  }, [customRange]);

  const applyFilter = (type) => {
    setFilterType(type);
    const now = new Date();
    let start, end;

    switch (type) {
      case "This Month": {
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        start = new Date(currentYear, currentMonth, 1);
        end = new Date(currentYear, currentMonth + 1, 0);
        break;
      }
      case "This Year": {
        const currentYear = now.getFullYear();
        start = new Date(currentYear, 0, 1);
        end = new Date(currentYear, 11, 31);
        break;
      }
      default:
        start = customRange.start;
        end = customRange.end;
    }

    setCustomRange({ start, end });
  };

  const applyCustomRange = () => {
    if (customRange.start && customRange.end) {
      setFilterType("Custom Range");
      // Custom range is already updated in state; no further action needed
    }
  };

  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Orders Bar Chart</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filterType === "This Month"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => applyFilter("This Month")}
        >
          This Month
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filterType === "This Year"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => applyFilter("This Year")}
        >
          This Year
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filterType === "Custom Range"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setFilterType("Custom Range")}
        >
          Custom Range
        </button>
      </div>

      {/* Custom Range Inputs */}
      {filterType === "Custom Range" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <DatePicker
              selected={customRange.start}
              onChange={(date) =>
                setCustomRange({ ...customRange, start: date })
              }
              className="border rounded-lg px-4 py-2 w-full"
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <DatePicker
              selected={customRange.end}
              onChange={(date) =>
                setCustomRange({ ...customRange, end: date })
              }
              className="border rounded-lg px-4 py-2 w-full"
              placeholderText="Select end date"
            />
          </div>
          <button
            className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg"
            onClick={applyCustomRange}
          >
            Apply
          </button>
        </motion.div>
      )}

      {/* Bar Chart */}
      <OrderBarChart filteredData={filteredData} />

      {/* Linear Chart for Orders vs Revenue */}
      <h2 className="text-xl font-bold text-center mt-8 mb-4">
        Orders vs Revenue By Dates
      </h2>
      <LineChartComponent data={filteredData} />
    </div>
  );
};

export default OrderCharts;
