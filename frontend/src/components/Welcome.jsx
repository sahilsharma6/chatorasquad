import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bikeImg from "../assets/bike.png";
import bowlImg from "../assets/bowl.png";
import apiClient from "../services/apiClient";

function Welcome() {
  const [pinCode, setPinCode] = useState("");
  const [deliveryAvailable, setDeliveryAvailable] = useState(null);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);


  useEffect(() => {
    setDeliveryAvailable(null);
    setChecked(false);
  }, [pinCode]);

  const handlePinCodeChange = (e) => {
    setPinCode(e.target.value);
  };

  const checkDelivery = async () => {
    setError("");
    setDeliveryAvailable(null);
    setChecked(false); 

    if (!pinCode.trim()) {
      setError("Please enter a valid zip code.");
      return;
    }

    try {
      const response = await apiClient.post(`/menu/checkdelivery`, { zipCode: pinCode });

      setDeliveryAvailable(response.data.deliveryAvailable);
      setChecked(true); 
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-yellow-400 w-full h-auto flex flex-col lg:flex-row items-center justify-center p-6 text-white">
      <div className="flex flex-col items-center justify-center space-y-4 lg:p-8 w-full lg:w-1/2">
        <h1 className="text-5xl md:text-8xl font-bold mb-4 text-center">
          Are you starving?
        </h1>
        <p className="text-2xl md:text-4xl text-gray-700 text-center p-4">
          Within a few clicks, find meals that are accessible near you
        </p>
        <div className="bg-white justify-center space-x-4 p-4 rounded-md w-full">
          <div className="flex justify-center space-x-4 w-full md:w-64">
            <img
              src={bikeImg}
              alt="location"
              className="w-12"
            />
            <button
              className="bg-white text-gray-700 py-2 rounded-md"
              onClick={() => {
                setDeliveryAvailable(null);
                setPinCode("");
                setChecked(false);
              }}
            >
              Delivery
            </button>
          </div>
          <hr className="w-full" />
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
            <input
              type="number"
              id="zipCode"
              value={pinCode}
              onChange={handlePinCodeChange}
              placeholder="Enter Your Zip Code"
              className="p-3 rounded-md text-black w-full md:w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            <button
              onClick={checkDelivery}
              className="bg-orange-600 text-white py-2 px-4 rounded-md m-2 transition-all hover:bg-orange-700 focus:ring-2 focus:ring-orange-500"
            >
              Check
            </button>
          </div>

          {error && (
            <div className="mt-4 text-center text-red-500">
              <p>{error}</p>
            </div>
          )}

          <AnimatePresence>
            {checked && !error && pinCode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-center text-lg"
              >
                {deliveryAvailable ? (
                  <p className="text-green-500">
                    Delivery is available in your area!
                  </p>
                ) : (
                  <p className="text-red-500">
                    Sorry, delivery is not available in your area.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="h-auto w-full p-4 hover:scale-105 transform transition duration-500 ease-in-out lg:w-1/2 flex justify-center">
        <img
          src={bowlImg}
          alt="food"
          className="w-auto h-auto md:w-96 lg:w-full"
          style={{ filter: "drop-shadow(1px 3px 5px black)" }}
        />
      </div>
    </div>
  );
}

export default Welcome;
