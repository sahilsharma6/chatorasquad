import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import Dashboard from './Dashboard';
import Orders from './Orders';
import ViewMenu from './ViewMenu';
import AddMenu from './AddMenu';
import ViewCuisine from './ViewCuisine';
import AddCuisineForm from './AddCuisineForm';
import AdminOfferPage from './AdminOfferPage';
import Sales from './Sales';
import OrderBarChart from './Invetory';


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex ">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isDesktop={isDesktop} />
      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} isDesktop={isDesktop} />
        <main className="py-4 px-3 lg:px-12  ">
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Default route */}
            {/* <Route path="users" element={<Users />} />*/}
            <Route path="reports/sales" element={<Sales />} />
            <Route path='reports/inventory' element={<OrderBarChart />} />
            {/* <Route path="settings" element={<Settings />} />  */}
            <Route path="orders" element={<Orders />} />
            <Route path='menu/view' element={<ViewMenu />} />
            <Route path='menu/add' element={<AddMenu />} />
            <Route path='cuisines/view' element={<ViewCuisine />} />
            <Route path='cuisines/add' element={<AddCuisineForm />} />
            <Route path='offers' element={<AdminOfferPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;