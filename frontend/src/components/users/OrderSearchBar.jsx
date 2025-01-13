// SearchBar.js
import React from 'react';
import { Search } from 'lucide-react';

const OrderSearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex-1 relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={30} />
    <input
      type="text"
      placeholder="Search your orders..."
      className="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-lg focus:outline-none border border-gray-200 focus:border-orange-500 transition"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
  );
};

export default OrderSearchBar;