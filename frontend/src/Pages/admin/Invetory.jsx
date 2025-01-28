import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import OrderBarChart from "../../components/admin/Inventory/OrderBarChart";
import PaymentRadarChart from "../../components/admin/Inventory/PaymentRadarChart";
import apiClient from "../../services/apiClient";

export default function Inventory() {
  const [orderDetails,setOrderDetails]=useState([])
  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await apiClient.get('/admin/orders');
        console.log(res.data);
        if(res.data){
        //  const transData= transformOrders(res.data.orders);
         console.log(res.data.orders);
         setOrderDetails(res.data.orders)
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  
    fetchOrder();
  }, []);
  
   console.log(orderDetails);
   
    return (
      <div className="flex flex-wrap justify-center" >
        <OrderBarChart transformedDt={orderDetails} />
        <PaymentRadarChart transformData={orderDetails} />
      </div>
  );
}
