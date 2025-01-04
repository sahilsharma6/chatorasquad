import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, ChevronRight, Minus, Plus, ShieldCheck } from 'lucide-react';

const PaymentUI = () => {
  const [selectedMethod, setSelectedMethod] = React.useState('');
  const [timeLeft, setTimeLeft] = React.useState(8 * 60);
  const [quantity, setQuantity] = React.useState(1);

  // Dynamic data object
  const productData = {
    name: "Veg Biryani",
    price: 239,
    originalPrice: 999,
    discount: "76% Off",
    deliveryDate: "2025-01-05",
    deliveryCharge: "Free",
    imageUrl: "https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/sanjeev-kapoor/media/post_banners/0ca7e47d7f0000f15684f1c700de8c22284cf7c28b0a55eec89b485246184e04.jpg",
  };

  const deliveryAddress = {
    name:"Rudra Maity",
    zipCode: 721626,
    city: "Bariebarh",
    state: "West Bengal",
    location: " Bariebarh new primary school",
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <div className="flex gap-4">
              <img 
                src={productData.imageUrl} 
                alt={productData.name}
                className="w-20 h-25 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{productData.name}</h3>
                   
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold">₹{productData.price}</span>
                      <span className="text-gray-500 line-through text-sm">₹{productData.originalPrice}</span>
                      <span className="text-green-600 text-sm">{productData.discount}</span>
                    </div>
                  </div>
                  <div className="text-sm text-green-600">
                    Delivery by {productData.deliveryDate} | {productData.deliveryCharge}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border rounded">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="text-red-600 hover:text-red-700">REMOVE</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Delivery Address */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className=" text-lg font-semibold text-gray-800">Delivery Address</h2>
              <button className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded transition-all delay-75 hover:scale-105">CHANGE</button>
            </div>
            <div className="flex items-start gap-3">
            <h2 className=" text-md font-semibold text-gray-800">Delivery To : {deliveryAddress.name}</h2>
              <MapPin className="text-gray-500 mt-1" size={20} />
              <p className="text-gray-600">
                {deliveryAddress.location +' , '+ deliveryAddress.city +' , '+ deliveryAddress.state + ' , '+deliveryAddress.zipCode }
              </p>
            </div>
          </motion.div>

          {/* Payment Options */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h2>
            <div className="bg-yellow-50 p-4 rounded-md mb-4">
              <div className="flex items-center gap-2">
                <Clock className="text-orange-500" size={20} />
                <p className="text-sm">Complete payment in {formatTime(timeLeft)}</p>
              </div>
            </div>

            {['UPI', 'Pay On Delivery', 'Credit / Debit / ATM Card', 'Net Banking'].map((method, index) => (
              <motion.div
                key={method}
                className={`border rounded-lg p-4 mb-3 cursor-pointer ${
                  selectedMethod === method ? 'border-orange-500' : 'border-gray-200'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedMethod(method)}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method ? 'border-orange-500' : 'border-gray-300'
                    }`}
                  >
                    {selectedMethod === method && (
                      <motion.div
                        className="w-3 h-3 bg-orange-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{method}</p>
                    <p className="text-sm text-gray-500">
                      {index === 3 ? 'This instrument has low success, use UPI or cards for better experience' : 'Pay securely using this method'}
                    </p>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Price Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-4 h-fit lg:sticky lg:top-4"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Price Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Price ({quantity} item{quantity > 1 ? 's' : ''})</span>
              <span>₹{productData.price * quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Fee</span>
              <span>₹3</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 font-semibold">
              <span>Amount Payable</span>
              <span>₹{(productData.price * quantity) + 3}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck size={58} className="fill-slate-700 text-white sha" />
            <span>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </span>
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentUI;