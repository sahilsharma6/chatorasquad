import { AnimatePresence, motion } from "framer-motion";
import { Edit, X } from "lucide-react";
import apiClient from "../services/apiClient";

export default function EditProfile({isEditProfileOpen, setIsEditProfileOpen,newAddress,setNewAddress,EditAddress}) {
    console.log(newAddress);
    
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
      };
      const saveAddress =async () => {
        try {
            const res=await apiClient.put('/user/updateaddress/'+newAddress._id,newAddress);
            console.log(res.data);
            setIsEditProfileOpen(false);
            EditAddress(newAddress);
        } catch (error) {
            
        }
      }

       // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        duration: 0.2 
      }
    }
  };
    return (
        <AnimatePresence>
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <motion.div 
              className="bg-white w-4/6 rounded-lg overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="text-lg flex items-center font-semibold mt-4 p-6 justify-between">
                <div className="flex items-center gap-2">
                  <Edit className="text-orange-500" /> 
                  <span>Edit Address</span>
                </div>
                <motion.div
                  whileHover={{ rotate: 90, backgroundColor: "#FDBA74" }}
                  transition={{ duration: 0.2 }}
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  <X size={24} />
                </motion.div>
              </h3>
              
              <form className="flex flex-col gap-4 mt-4 border-t-2 border-orange-600 pt-4 p-6">
                <input
                  type="number"
                  name="zipCode"
                  value={newAddress.zipCode}
                  onChange={handleAddressChange}
                  placeholder="Postal Code"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="location"
                  value={newAddress.location}
                  onChange={handleAddressChange}
                  placeholder="Detailed Location"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <motion.button
                  type="button"
                  className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: "#EA580C" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveAddress}
                >
                  Save Changes
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
}