import { AnimatePresence,motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

export default function CustomerCard({currentData,setSelectedCustomer,setShowModal}){
    return (
        <div className="md:hidden space-y-4">
        <AnimatePresence>
          {currentData.map((customer) => (
            <motion.div
              key={customer.id}
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
                  <h3 className="font-semibold">{customer.firstName}</h3>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={30} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={30} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    )
}