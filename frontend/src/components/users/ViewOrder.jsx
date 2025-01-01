import { motion } from "framer-motion"
import { Check, MapPin, Phone, Star } from "lucide-react"

export default function ViewOrder({orderData,shippingData,setShowModal,review}){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Product Details */}
          <div className="flex justify-between">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{orderData.productName}</h2>
                <p className="text-gray-600">{orderData.productType}</p>
              </motion.div>

              {/* Order Status */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6"
              >
                <div className="relative pl-8">
      {/* Vertical connecting line */}
      <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-green-500"></div>
      
      {/* Order Confirmed */}
      {orderData.orderStatus.map((val,i)=>(
      <div className="relative mb-6">
        <div className="absolute left-[-32px] w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm"
        >
         {val.status } , {val.date} , {val.time}
        </motion.p>
      </div>
      )
)}
     
    </div>
              </motion.div> 
            </div>
            <motion.div>
              <img src={orderData.img} alt="" className='w-20 h-20 rounded-lg shadow-md' />
            </motion.div>
          </div>

          {/* Rating Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="mb-6 text-orange-500 flex items-center"
          >
            <span className="mr"><Star /></span> {review ?'Edit':'Add'}   Rating&Review
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
                <span>List price</span>
                <span>₹{orderData.listPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Selling price</span>
                <span>₹{orderData.sellingPrice}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Extra Discount</span>
                <span>-₹{orderData.extraDiscount}</span>
              </div>
              <div className="flex justify-between">
                <span>Special Price</span>
                <span>₹{orderData.specialPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Handling Fee</span>
                <span>₹{orderData.handlingFee}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Final Amount</span>
                <span>₹{orderData.finalAmount}</span>
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
                <h4 className="font-semibold text-gray-800">{shippingData.name}</h4>
                <p className="text-gray-600">{shippingData.institution}</p>
                <p className="text-gray-600">{shippingData.area}</p>
                <p className="text-gray-600">{shippingData.locality}</p>
                <p className="text-gray-600">{shippingData.region}</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <p>{shippingData.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
}