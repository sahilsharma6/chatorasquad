import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import OrderBarChart from "../../components/admin/Inventory/OrderBarChart";
import PaymentRadarChart from "../../components/admin/Inventory/PaymentRadarChart";

const data = [
  {
    date: "2024-12-20",
    orderStatus: {
      "Order Returned": 2,
      "Order Confirmed": 5,
      "Order Dispatched": 4,
      "Order Delivered": 8,
      "Order Cancelled": 1,
    },
  },
  {
    date: "2024-12-21",
    orderStatus: {
      "Order Returned": 1,
      "Order Confirmed": 6,
      "Order Dispatched": 3,
      "Order Delivered": 9,
      "Order Cancelled": 2,
    },
  },
  {
    date: "2024-12-22",
    orderStatus: {
      "Order Returned": 3,
      "Order Confirmed": 7,
      "Order Dispatched": 5,
      "Order Delivered": 10,
      "Order Cancelled": 1,
    },
  },
];

const transformedData = data.map((entry) => ({
  date: entry.date,
  ...entry.orderStatus,
}));

export default function Inventory() {
   
    return (
      <div className="flex flex-wrap justify-center" >
        <OrderBarChart transformedData={transformedData} />
        <PaymentRadarChart />
      </div>
  );
}
