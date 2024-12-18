import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isDesktop={isDesktop} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header toggleSidebar={toggleSidebar} isDesktop={isDesktop} />
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">Analytics</h1>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
