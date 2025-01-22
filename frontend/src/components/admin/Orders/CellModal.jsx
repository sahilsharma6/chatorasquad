import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function CellModal({ setSelectedRow, selectedRow ,updateOrderStatus}) {
  const [status, setStatus] = useState(null);

  
  useEffect(() => {
    if (selectedRow) {
      setStatus(selectedRow.status);
    } else {
      setStatus(null);
    }
  }, [selectedRow]);

  const closeModal = () => {
    setSelectedRow(null); // Close the modal
  };

  const handleSaveChanges = () => {
    if (selectedRow) {
      const updatedOrder = {
        ...selectedRow, // Spread the current selectedRow properties
        status,        
      };
      updateOrderStatus(updatedOrder); 
    
      
      closeModal();
    }
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

            <motion.div className="mx-auto flex">
              <div className="mx-auto">
                <label htmlFor="orderStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>

                <select
                  id="orderStatus"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-500 dark:border-orange-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {status === "confirm" ? (
                    <>
                      <option value="confirm" disabled>
                        Confirm
                      </option>
                      <option value="deliverd">Delivered</option>
                      <option value="cancel">Cancel</option>
                    </>
                  ) : status === "deliverd" ? (
                    <>
                      <option value="deliverd" disabled>
                        Delivered
                      </option>
                      <option value="refund">Refund</option>
                    </>
                  ) : status === "cancel" ? (
                    <option value="cancel" disabled>
 Cancel
                    </option>
                  ) : (
                    <option value="refund" disabled>
                      Refund
                    </option>
                  )}
                </select>
              </div>
              <div className="mx-auto mt-6">
                <motion.button className="bg-orange-500 text-white p-3 rounded-md shadow hover:scale-105 transition-all delay-100" onClick={handleSaveChanges}>
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}