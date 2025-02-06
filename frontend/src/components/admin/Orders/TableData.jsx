import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import CellModal from "./CellModal";


export default function Data({paginatedData,handleSort,updateOrderstatus}){
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row); // Set the selected row data
  };

    return (
        <div className="overflow-auto">
        {window.innerWidth < 768 ? (
          <div className="grid grid-cols-1 gap-4">
            {paginatedData.map((row) => (
              <motion.div
                key={row.item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(row)}
              >
                <div><strong>#Item Id:</strong> {row.item}</div>
                <div><strong>Order Type:</strong> {row.DishesName}</div>
                <div><strong>Name:</strong> {row.Name}</div>
                <div><strong>Email:</strong> {row.email}</div>
                <div><strong>Phone:</strong> {row.phone}</div>
                <div><strong>Value:</strong> 	₹{row.value.toLocaleString()}</div>
                <div><strong>Date:</strong> {row.Date}</div>
                <div><strong>Order Status:</strong> {row.status}</div>
                <div><strong>Payment Status:</strong> {row.paymentStatus}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <table className="w-full overflow-auto border">
            <thead className="bg-gray-50">
              <tr >
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800">#Item</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('DishesName')}>
                  Dishes Name <LuArrowDownUp size={26} />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('Name')}>
                  Name <LuArrowDownUp size={26} />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 curs" >
                	₹  Value 
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('Date')}>
                  Date <LuArrowDownUp size={26} />
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer">Order Status</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedData.map((row) => (
                  <motion.tr
                    key={row.item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    <td className="px-4 py-3 text-sm">{row.item}</td>
                    <td className="px-4 py-3 text-sm">{row.DishesName}</td>
                    <td className="px-4 py-3 text-sm">{row.Name}</td>
                    <td className="px-4 py-3 text-sm">{row.email}</td>
                    <td className="px-4 py-3 text-sm">	₹{row.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{row.Date}</td>
                    <td className="px-4 py-3 text-sm"> <span className={`py-1 px-3 rounded-full text-xs 
            ${row.status === 'Confirm' ? 'bg-black text-white' : 
              row.status === 'Cancel' ? 'bg-red-200 text-red-600' : 
              row.status === 'Delivered' ? 'bg-green-200 text-green-600' : 
              row.status === 'Refund' ? 'bg-yellow-200 text-yellow-600' : 
              'bg-gray-200 text-gray-600'}`}>
            {row.status}
        </span></td>
                    <td className="px-4 py-3 text-sm"> <span className={`py-1 px-3 rounded-full text-xs 
            ${row.paymentStatus === 'completed' ? 'bg-green-500 text-white' : 
              row.paymentStatus === 'cancelled' ? 'bg-red-200 text-red-600' : 
              row.paymentStatus === 'failed' ? 'bg-red-200 text-red-600' : 
              row.paymentStatus === 'refund' ? 'bg-yellow-200 text-yellow-600' : 
              'bg-gray-200 text-gray-600'}`}>
            {row.paymentStatus}
        </span></td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>  
          </table>
        )}
        <CellModal selectedRow={selectedRow} setSelectedRow={setSelectedRow} updateOrderStatus={updateOrderstatus} />
      </div>
    )
}