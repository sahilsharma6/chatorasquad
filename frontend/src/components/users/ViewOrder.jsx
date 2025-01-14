import { motion } from "framer-motion";
import { Check, MapPin, Phone, Star } from "lucide-react";

export default function ViewOrder({
  orderData,
  shippingData,
  setShowModal,
  review,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column - Order Details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Product Details */}
        <div className="mb-6 ">
          {orderData.items && orderData.items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Items
              </h2>
              <div className="space-y-6 h-56 overflow-y-auto">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-6">
                    <img
                      src={import.meta.env.VITE_API_URL + "/" + item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">₹{item.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6"
          >
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Status
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-600 text-sm">
                  {orderData.orderStatus},{" "}
                  {new Date(orderData.createdAt).toLocaleDateString()},{" "}
                  {new Date(orderData.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rating Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="mb-6 text-orange-500 flex items-center"
        >
          <Star className="mr-2" /> {review ? "Edit" : "Add"} Rating & Review
        </motion.button>

        {/* Price Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t pt-4"
        >
          <h3 className="font-semibold mb-4">Price Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span className=" text-xl font-semibold">₹{orderData.total}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Shipping Details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-orange-500" />
            Shipping Details
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">{shippingData.city}</h4>
              <p className="text-gray-600">{shippingData.state}</p>
              <p className="text-gray-600">{shippingData.zipCode}</p>
              <p className="text-gray-600">{shippingData.location}</p>
              <div className="flex items-center mt-2 text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <p>{shippingData.phone}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
