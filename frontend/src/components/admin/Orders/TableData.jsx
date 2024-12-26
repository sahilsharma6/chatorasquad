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
                key={row.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(row)}
              >
                <div><strong>#:</strong> {row.id}</div>
                <div><strong>Order Type:</strong> {row.DishesName}</div>
                <div><strong>Name:</strong> {row.Name}</div>
                <div><strong>Email:</strong> {row.email}</div>
                <div><strong>Phone:</strong> {row.phone}</div>
                <div><strong>Value:</strong> ${row.value.toLocaleString()}</div>
                <div><strong>Date:</strong> {row.Date}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <table className="w-full overflow-auto border">
            <thead className="bg-gray-50">
              <tr >
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">#</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('DishesName')}>
                  Dishes Name <LuArrowDownUp size={26} />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('Name')}>
                  Name <LuArrowDownUp size={26} />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('value')}>
                  Value <LuArrowDownUp size={26} />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('Date')}>
                  Date <LuArrowDownUp size={26} />
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedData.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    <td className="px-4 py-3 text-sm">{row.id}</td>
                    <td className="px-4 py-3 text-sm">{row.DishesName}</td>
                    <td className="px-4 py-3 text-sm">{row.Name}</td>
                    <td className="px-4 py-3 text-sm">{row.email}</td>
                    <td className="px-4 py-3 text-sm">${row.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{row.Date}</td>
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