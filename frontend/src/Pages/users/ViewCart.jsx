import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import CartItems from '../../components/CartItems';
import { ShieldCheck } from 'lucide-react';
import CartItemsData from '../../Data/CartItems.json'
import Loader from '../../components/Loader';
import NoResults from '../../components/NoResults';

const ViewCart = () => {
  const [cartItems, setCartItems] = useState(CartItemsData);
  const [loading, setLoading] = useState(true); // State to manage loader

  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems(CartItemsData);
      setLoading(false);
    }, 1300); // Mock loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  if(loading){
    return <Loader /> 
  }

  if(cartItems.length<1){
    return <NoResults img={'https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90'} title={'Your Cart is Empty'} des={'Cart is Empty Please Go To Menu and Add to Cart Some dishes'}/>
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
      {/* Left Box (65% Width) */}
      <div className="flex-1 min-h-screen overflow-y-auto shadow px-4 py-4">
        {/* Shipping and delivery options */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg flex justify-between">
          <div>
            <p className="text-orange-500 text-sm">From Saved Addresses</p>
          </div>
          <div className="">
            <button className="text-orange-500 text-sm bg-transparent font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded hover:bg-orange-500 transition ease-in-out delay-150 hover:-translate-y-1">
              Enter Delivery Location
            </button>
          </div>
        </div>

        {/* Food Items */}
        {cartItems.map((item) => (
          <CartItems
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
            {/* Add-on Card */}
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 border rounded-lg mb-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Add Extra Cheese</h4>
              <p className="text-sm text-gray-600">Make your pizza more cheesy</p>
              <p className="mt-1">
                <span className="font-semibold">₹40</span>
                <span className="text-sm text-gray-500 ml-2">Optional</span>
              </p>
            </div>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Add
            </button>
          </div>
        </motion.div>

        {/* Place Order Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          Place Order
        </motion.button>
      </div>

      {/* Right Box */}
      <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg sticky shadow top-4">
        <h3 className="font-semibold mb-4">Price Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Price ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>
              - ₹
              {cartItems.reduce(
                (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span>₹3</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Delivery Charges</span>
            <span>Free</span>
          </div>
          <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
            <span>Total Amount</span>
            <span>
              ₹
              {cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              ) + 3}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck size={58} className="fill-slate-700 text-white sha" />
          <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
