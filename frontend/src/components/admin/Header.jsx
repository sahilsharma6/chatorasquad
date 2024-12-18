import React from 'react';
import { Menu, Search, Bell, ShoppingBag } from 'lucide-react';

const Header = ({ toggleSidebar, isDesktop }) => (
  <header className="bg-white border-b p-4 shadow">
    <div className="flex items-center justify-around">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2">
          <Menu size={33} />
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className="pl-10 pr-4 py-4 border rounded w-72 focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow"
          />
          <Search className="absolute left-3 top-4 text-gray-400" size={30} />
        </div>
      </div>
      {isDesktop && (
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
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
            className="w-14 h-14 rounded-full border-4 border-yellow-500"
          />
        </div>
      )}
    </div>
  </header>
);

export default Header;
