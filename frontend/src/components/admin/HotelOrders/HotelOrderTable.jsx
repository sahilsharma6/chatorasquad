import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";

export default function HotelOrderTable({ currentItems, requestSort, updateOrderStatus,itemVariants,onOpenMoadl }) {
  return (
    <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Ph. No.
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('dishName')}
                >
                  <div className="flex items-center">
                    Dish Name
                    <ArrowUpDown size={22} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('hotelName')}
                >
                  <div className="flex items-center">
                    Hotel Name
                    <ArrowUpDown size={22} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('roomName')}
                >
                  <div className="flex items-center">
                    Room Name
                    <ArrowUpDown size={22} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('value')}
                >
                  <div className="flex items-center">
                    Value (₹)
                    <ArrowUpDown size={22} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => requestSort('date')}
                >
                  <div className="flex items-center">
                    Date & Time
                    <ArrowUpDown size={22} className="ml-1 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Status
                </th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th> */}
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((order, index) => (
                <motion.tr 
                  key={order.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={index}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onOpenMoadl(order)}
                >
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="font-mono">{order.phoneNo}</span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="font-mono">{order.customerName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.dishName.length>1 ? order.dishName.slice(0,3).join(", ") + "..." : order.dishName.join(", ")}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.hotelName}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.roomName}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.value.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{order.date}</div>
                    <div className="text-xs text-gray-400">{order.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        order.orderStatus === 'Confirm' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td> */}
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium  cursor-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex space-x-2">
                      <select 
                        className="text-xs border rounded p-1 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                       
                      >
                        {/* <option value="Pending">Pending</option> */}
                        {/* <option value="Confirm">Confirm</option> */}
                        {order.orderStatus === 'Cancelled' ? <option value="Cancelled">Cancelled</option> 
                        :
                        <>
                        {order.orderStatus === 'Delivered' ? <option value="Delivered">Delivered</option> :<>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option></>}
                        </>}
                      </select>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}