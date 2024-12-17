import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, ShoppingCart, Book, Users, BarChart2, Search, Bell, ShoppingBag } from 'lucide-react';

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar, isDesktop }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {!isDesktop && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: isDesktop ? 0 : -300 }}
        animate={{ x: isDesktop ? 0 : isOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed  left-0 top-0 bottom-0 w-64 bg-white shadow-lg z-20 
          ${isDesktop ? 'static translate-x-0' : ''}`}
      >
        {/* Logo */}
        <div className="flex items-start p-4 border-b justify-center">
          <div className="flex flex-col">

          <div className="text-2xl font-bold text-orange-500">ChatoraSquad</div>
          {!isDesktop && (
              <img
              src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User avatar"
              className="w-16 h-16 rounded-full border-4 border-orange-500 mt-4"
            />
           )}
          </div>
          <button
            onClick={toggleSidebar}
            className="ml-auto lg:hidden p-2"
          >
            <X size={33} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 overflow-auto h-screen">
          {[
            { icon: Home, label: 'Dashboard', active: false },
            { icon: ShoppingCart, label: 'Orders', active: false },
            { icon: Book, label: 'Menu', active: false, hasSubmenu: true },
            { icon: Users, label: 'Customer', active: false },
            { icon: BarChart2, label: 'Analytics', active: true },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                item.active
                  ? 'bg-orange-200 text-orange-500'
                  : 'hover:bg-orange-500 hover:text-white'
              }`}
            >
              <item.icon size={28} />
              <span className="ml-3">{item.label}</span>
            </div>
          ))}

          {/* Mobile View Header Items */}
         {/* Mobile View Header Items */}
{!isDesktop && (
  <>
    <div className="mt-4">
      {/* Recipe Guide Button */}
      <button className="flex items-center p-3 rounded-lg cursor-pointer bg-orange-500 text-white w-full justify-center">
        Recipe Guide
      </button>
    </div>

    {/* Notification and Cart as Sidebar Items */}
    <div className="mt-4">
      {[
        { icon: Bell, label: 'Notifications', badge: 2 },
        { icon: ShoppingBag, label: 'Cart', badge: 3 },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors hover:bg-orange-500 hover:text-white"
        >
          <div className="relative">
            <item.icon size={28} />
            {item.badge > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </div>
          <span className="ml-3">{item.label}</span>
        </div>
      ))}
    </div>
  </>
)}

        </nav>
      </motion.div>
    </>
  );
};

// Header Component
const Header = ({ toggleSidebar, isDesktop }) => {
  return (
    <header className="bg-white border-b p-4 shadow">
      <div className="flex items-center justify-around">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu */}
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2"
          >
            <Menu size={33} />
          </button>
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              className="pl-10 pr-4 py-4 border rounded w-72 focus:ring-2 focus:ring-orange-500 focus:outline-none dark:focus:ring-orange-500 shadow focus:shadow-md focus:rounded-lg transition-all delay-50"
            />
            <Search className="absolute left-3 top-4 text-gray-400" size={30} />
          </div>
        </div>

        {/* Desktop View Header Items */}
        {isDesktop && (
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Recipe Guide
            </button>
            <div className="relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </span>
            </div>
            <div className="relative">
              <ShoppingBag size={24} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User avatar"
              className="w-14 h-14 rounded-full border-4 border-orange-500"
            />
          </div>
        )}
      </div>
    </header>
  );
};

// DashboardLayout Component
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Tailwind's `lg` breakpoint
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
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isDesktop={isDesktop} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header toggleSidebar={toggleSidebar} isDesktop={isDesktop} />
        <main className="p-4">
          {/* Your dashboard content */}
          <h1 className="text-2xl font-bold mb-4">Analytics</h1>
          {/* Add your dashboard components here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
