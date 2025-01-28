import { motion } from "framer-motion";
import { X, MapPin } from "lucide-react";

export default function CustomerTableModal({ isOpen, onClose, customer }) {

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
          <X size={30} className='hover:bg-yellow-100 transition-all delay-100 rounded-full' />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Details</h2>
        
        <div className="space-y-4">
          {/* Personal Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Personal Info</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <p className="font-medium">{customer.firstName} {customer.lastName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Age</label>
                <p className="font-medium">{customer.age}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Gender</label>
                <p className="font-medium">{customer.gender}</p>
              </div>
            
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Contact Info</h3>
            <div>
              <div className="mb-2">
                <label className="text-sm text-gray-600">Phone</label>
                <p className="font-medium">{customer.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium">{customer.email}</p>
              </div>
            </div>
          </div>

          {/* Addresses Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Addresses</h3>
            {customer.addresses?.map((address, index) => (
              <div 
                key={index} 
                className="border-b last:border-b-0 py-3 flex items-center"
              >
                <MapPin className="mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">
                    {address.location}, {address.city}, {address.state} {address.zipCode}
                  </p>
                  {address.type === 'default' && (
                    <span className="text-sm text-green-600 font-semibold">
                      Default Address
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
            
    </div>
  );
}