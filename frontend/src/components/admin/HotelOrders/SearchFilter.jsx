import { Search } from "lucide-react";

export default function SearchFilter({searchTerm, setSearchTerm, indexOfFirstItem, indexOfLastItem, getFilteredAndSortedOrders}) {
    return (
        <>
        <div className="p-6 bg-gradient-to-r from-orange-500 to-yellow-600">
        <h1 className="text-2xl font-bold text-white">Order Management m</h1>
        <p className="text-blue-100 mt-2">Manage hotel and room orders </p>
      </div>
        <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by dish, room, hotel..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, getFilteredAndSortedOrders().length)} of {getFilteredAndSortedOrders().length} entries
        </div>
      </div></>
    )
}