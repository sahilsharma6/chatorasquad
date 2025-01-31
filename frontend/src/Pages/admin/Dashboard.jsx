
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, IndianRupee, ClipboardList, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Piechart from '../../components/admin/Dashboard/Piechart';
import Areachart from '../../components/admin/Dashboard/Areachart';
import StatCard from '../../components/admin/Dashboard/StatCard';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';

const data = [
  { name: '2024-02-01', netProfit: 20, revenue: 15 },
  { name: '2024-06-02', netProfit: 30, revenue: 25 },
  { name: '2024-09-03', netProfit: 35, revenue: 40 },
  { name: '2024-05-04', netProfit: 40, revenue: 35 },
  { name: '2024-10-05', netProfit: 45, revenue: 40 },
  { name: '2025-01-06', netProfit: 80, revenue: 45 },
  { name: '2025-03-07', netProfit: 90, revenue: 40 },
];


function convertOrdersToOrderData(orders) {
  const orderStatusCount = {};

  // Count the occurrences of each order status
  orders.forEach(order => {
      const status = order.orderStatus;
      if (!orderStatusCount[status]) {
          orderStatusCount[status] = {
              name: status,
              value: 0,
              color: getColorForStatus(status), // Function to get color based on status
              date: order.date.split('T')[0] // You can choose to use the latest date or any specific logic to determine the date
          };
      }
      orderStatusCount[status].value += 1;
  });

  // Convert the object to an array
  return Object.values(orderStatusCount);
}

function getColorForStatus(status) {
  switch (status) {
      case 'On Delivery':
          return '#FF6B6B';
      case 'Delivered':
          return '#4ADE80';
      case 'Cancelled':
          return '#94A3B8';
      case 'Pending':
          return '#FFD700'; // Example color for Pending
      default:
          return '#000000'; // Default color
  }
}

// const orderData = convertOrdersToOrderData(orders);
const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), 11, 31));
  const [getOrder,setOrder] = useState([]);
  const [getMenu,setMenu] = useState();
  const[getUsers,setUsers]=useState([]);



  useEffect( () => {
    try{
    async function fetchOrderData() {
        const res=await apiClient.get('/admin/orders');
    console.log(res.data.orders);
    setOrder(res.data.orders);
    }    

    async function fetchMenuData() {
        const res=await apiClient.get('/menu/all');
        console.log(res.data);
        setMenu(res.data.totalCount);
        
    }

    async function getUsers() {
      const res = await apiClient.get('/admin/allusers');
      console.log(res.data);
      if(res.data){
        setUsers(res.data);
      }
    }
    
    fetchOrderData();
    fetchMenuData();
    getUsers();
  }catch(error){
    console.log("Failed to fetch data",error);
  }
  },[])

  const orderData=convertOrdersToOrderData(getOrder);
  console.log(orderData);
  
  const filteredData = data.filter(item => {
    const date = new Date(item.name);
    return date >= startDate && date <= endDate;
  });

  const filteredOrderData = orderData.filter(order => {
    const orderDate = new Date(order.date);
    return orderDate >= startDate && orderDate <= endDate;
  });



  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome to ChartoraSquad Admin!</p>
          </div>
          <div className="flex space-x-4 gap-6 flex-col">
            <label htmlFor="">Filter By Date :</label>
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              className="bg-transparent text-orange-600 text-sm p-2 rounded border border-gray-300"
              dateFormat="yyyy-MM-dd"
            />

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Coffee}
            value={getMenu}
            label="TOTAL MENUS"
            className="bg-yellow-50 text-yellow-600 shadow-md"
          />
          <StatCard
            icon={IndianRupee}
            value="12k"
            label="TOTAL REVENUE"
            className="bg-yellow-50 text-yellow-600 shadow-md"
          />
          <StatCard
            icon={ClipboardList}
            value={getOrder.length}
            label="TOTAL ORDERS"
            className="bg-yellow-50 text-yellow-600 shadow-md"
          />
          <StatCard
            icon={Users}
            value={getUsers?.length}
            label="TOTAL CLIENT"
            className="bg-yellow-50 text-yellow-600 shadow-md"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm flex flex-wrap gap-6"
          >
            <div className="flex justify-between items-center mb-6 flex-wrap">
              <div>
                <h2 className="text-lg font-bold">Orders Summary</h2>
                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur</p>
              </div>
              {/* <div className="flex space-x-2">
                <button className="px-4 py-1 text-sm rounded-full bg-orange-600 text-white">Monthly</button>
                <button className="px-4 py-1 text-sm rounded-full">Weekly</button>
                <button className="px-4 py-1 text-sm rounded-full">Today</button>
              </div> */}
            </div>

            <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center mb-6 gap-4">
              <div className="flex items-center space-x-2 justify-center text-center">
                <span className="text-2xl font-bold text-orange-600">{filteredOrderData.filter((val)=> val.name==="Pending")[0]?.value
                   }</span>
                <span className="text-orange-600">New Orders</span>
              </div>
              <Link to={'/admin/orders'} className="text-blue-600 hover:underline">Manage orders →</Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">25</div>
                <div className="text-gray-500 text-sm">On Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">60</div>
                <div className="text-gray-500 text-sm">Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">7</div>
                <div className="text-gray-500 text-sm">Canceled</div>
              </div>
            </div>
            {/* PieChart  */}
            <Piechart filteredOrderData={filteredOrderData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold">Revenue</h2>
                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur</p>
              </div>

            </div>

            <div className="flex justify-between mb-6">
              <div>
                <p className="text-gray-500 text-sm">Income</p>
                <p className="text-2xl font-bold"> ₹41,512k</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Expense</p>
                <p className="text-2xl font-bold"> ₹41,512k</p>
              </div>
            </div>
            {/* AreaChart  */}
            <Areachart filteredData={filteredData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;