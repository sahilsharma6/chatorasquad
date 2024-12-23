import { AnimatePresence,motion } from "framer-motion";
import { X } from "lucide-react";

export default function CellModal ({setSelectedRow,selectedRow}){

    const closeModal = () => {
        setSelectedRow(null); // Close the modal
      };
    return (
      <AnimatePresence>
      {selectedRow && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-orange-100 rounded-full transition-all delay-100 p-1"
              >
               <X size={34} />
              </button>
            </div>
            <div className="space-y-2">
              <p>
                <strong>#:</strong> {selectedRow.id}
              </p>
              <p>
                <strong>Order Type:</strong> {selectedRow.DishesName}
              </p>
              <p>
                <strong>Company:</strong> {selectedRow.Name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRow.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRow.phone}
              </p>
              <p>
                <strong>Value:</strong> ${selectedRow.value.toLocaleString()}
              </p>
              <p>
                <strong>Date:</strong> {selectedRow.Date}
              </p>
            </div>
           
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    )
}