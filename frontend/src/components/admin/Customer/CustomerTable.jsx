import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";

export default function CustomerTable({setSelectedCustomer,setShowModal,sortConfig,sortData,currentData}){
    
    return (
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left">
                <button
                  onClick={() => sortData('firstName')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  NAME
                  {sortConfig.key === 'firstName' && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={30} /> : <ChevronDown size={30} />
                  )}
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => sortData('phone')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  PHONE NUMBER
                  {sortConfig.key === 'phone' && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={30} /> : <ChevronDown size={30} />
                  )}
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => sortData('email')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  EMAIL ADDRESS
                  {sortConfig.key === 'email' && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={30} /> : <ChevronDown size={30} />
                  )}
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => sortData('created')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  CREATED
                  {sortConfig.key === 'created' && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={30} /> : <ChevronDown size={30} />
                  )}
                </button>
              </th>
              <th className="p-4 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {currentData.map((customer) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowModal(true);
                  }}
                  className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">{customer.firstName}</td>
                  <td className="p-4">{customer.phoneNo}</td>
                  <td className="p-4">{customer.email}</td>
                  <td className="p-4">{new Date(customer.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      {/* <button 
                        className="text-blue-500 hover:text-blue-700" 
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowModal(true);
                        }}
                      >
                        View Details
                      </button> */}
                      <button className="text-orange-500 hover:text-orange-700">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    )
}