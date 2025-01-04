import { AnimatePresence, motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

export default function CustomerCard({ currentData, setSelectedCustomer, setShowModal }) {
  console.log(currentData);
  return (
    <div className="md:hidden space-y-4">
      <AnimatePresence>
        {currentData.map((customer) => (
          <motion.div
            key={customer._id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-4 rounded-lg shadow"
            onClick={() => {
              setSelectedCustomer(customer);
              setShowModal(true);
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{customer.firstName} {customer.lastName}</h3>
                <p className="text-sm text-gray-500">Phone: {customer.phoneNo}</p>
                <p className="text-sm text-gray-600">{customer.email}</p>
                
                <p className="text-xs text-gray-400">Created on: {new Date(customer.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700" aria-label="Edit">
                  <Edit size={30} />
                </button>
                <button className="text-red-500 hover:text-red-700" aria-label="Delete">
                  <Trash2 size={30} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
