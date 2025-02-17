import { motion } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";
import { toast, ToastContainer } from "react-toastify";

export default function CustomerTableModal({ isOpen, onClose, customer }) {
  const [selectedRole, setSelectedRole] = useState(customer.role);
  const [hotelName,setHotelName]=useState('')
  console.log(selectedRole);


  
  if (!isOpen) return null;
  const getHighlightPosition = () => {
    switch (selectedRole) {
      case 'user':
        return '0%';
      case 'hotel':
        return '33.33%';
      case 'resturant':
        return '66.66%';
      default:
        return '0%';
    }
  };
  useEffect(() => {
    try {
      async function fetchUser(url) {
        const response = await apiClient.get(url);
        if(!response.data) return
        console.log(response.data);
        
        setHotelName(response.data.name)
      }

      if(selectedRole!=='user' && customer._id && customer.role!=='admin'){ 
        const url = selectedRole === 'hotel' ? `/hotel/${customer._id}` : `/restaurant/${customer._id}`;
        fetchUser(url);
      }
    } catch (error) {
      
    }
  },[selectedRole,customer._id,customer.role]);

  const handelChangeRole=async ()=>{
    try {
      let roleUrl='/admin/changeuserrole'
      if(selectedRole!=='user'){
      roleUrl=  selectedRole ==='hotel' ? '/hotel/changerole/'+customer._id :'/restaurant/changerole/'+customer._id
      }
       const isChanged=await apiClient.put(roleUrl,{newRole:selectedRole,userId:customer._id,name:hotelName})

       if(isChanged.data.user){
        // console.log();
        toast.success('User Role Changed successfully',
              {
                position: "top-right",
                autoClose: 2000,
              }
        
       )
      }
    } catch (error) {
      toast.info('User Role Changed Failed',{
        position: "top-right",
        autoClose: 2000,
      })
    }
  

  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <ToastContainer />
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
                <p className="font-medium">{customer.phoneNo}</p>
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
     { selectedRole!=='admin' &&   <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Update Customer Role</h2>
      <div>
      <div className="relative bg-gray-100 rounded-lg p-2">
        <motion.div
          className="absolute h-12 bg-orange-500 rounded-md"
          layoutId="highlight"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: '33.33%',
            height: '80%',
            top: '10%',
            left: getHighlightPosition()
          }}
        />
        
        <div className="relative grid grid-cols-3 gap-4">
          {[
    { id: 'user', label: 'User', icon: '👤' },
    { id: 'hotel', label: 'Hotel', icon: '🏨' },
    { id: 'resturant', label: 'Resturant', icon: '🍽️ ' }
  ].map((role) => (
            <motion.button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`relative z-10 p-3 h  text-center rounded-md transition-colors
                ${selectedRole === role.id ? 'text-white' : 'text-gray-600 hover:text-gray-800'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl mb-1">{role.icon}</span>
              <span className="block font-medium">{role.label}</span>
            </motion.button>
          ))}
        </div>
        
      </div>
    {selectedRole!=='user' &&  <input 
                type="text"
                required={true}
                value={hotelName}
                onChange={(e) => {
                  setHotelName(e.target.value);
                  // setError('');
                }}
                placeholder={selectedRole=='hotel'? "Enter Hotel Name " :"Enter Rsturant Name "}
                className="w-full p-4 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400 mt-6"
              />
}
      </div>
      <motion.button
        className="mt-6 w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium
          hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handelChangeRole}
      >
        Save Changes
      </motion.button>
    </div> }
      </motion.div>
    </div>
  );
}