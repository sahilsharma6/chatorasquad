import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import apiClient from "../../../services/apiClient";

export default function TableModal({ isModalOpen, setIsModalOpen, selectedItem, setOffer, offer, handleUpdateOffer }) {
  
  
    
 
  return (
    <>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Update Offer for {selectedItem.name}</h2>
              <X className="hover:bg-yellow-200 rounded-full cursor-pointer transition-all delay-100 p-1 hover:text-gray-800" size={43} onClick={() => setIsModalOpen(false)} />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Offer Percentage</label>
              <input
                type="number"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                className="w-full border rounded-lg px-4 py-4 border-orange-500 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter Offer Discount %"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleUpdateOffer}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Update Offer
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}