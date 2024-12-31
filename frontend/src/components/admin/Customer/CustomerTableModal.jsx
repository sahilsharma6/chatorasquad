import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function CustomerTablemodal({ isOpen, onClose, customer }){
    if (!isOpen) return null;
    
return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg p-6 w-full max-w-md relative overflow-auto max-h-screen"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={30} className='hover:bg-yellow-100 transition-all delay-100 rounded-full'  />
              </button>
              <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="font-semibold block">Name</label>
                  <p>{customer.firstName} {customer.lastName}</p>
                </div>
                <div>
                  <label className="font-semibold block">Phone</label>
                  <p>{customer.phone}</p>
                </div>
                <div>
                  <label className="font-semibold block">Email</label>
                  <p>{customer.email}</p>
                </div>
                <div>
                  <label className="font-semibold block">Created</label>
                  <p>{customer.created}</p>
                </div>
                <div>
                  <label className="font-semibold block">Age</label>
                  <p>{customer.age}</p>
                </div> <div>
                  <label className="font-semibold block">Gender</label>
                  <p>{customer.gender}</p>
                </div>
              </div>
            </motion.div>
          </div>
        
)
}