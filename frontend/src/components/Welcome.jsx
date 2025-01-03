import React, { useState } from "react";
import bikeImg from "../assets/bike.png";
import bowlImg from "../assets/bowl.png";
import apiClient from "../services/apiClient";

function Welcome() {
  const [pinCode, setPinCode] = useState("");
  const [deliveryAvailable, setDeliveryAvailable] = useState(null);
  const [error, setError] = useState("");

  const handlePinCodeChange = (e) => {
    setPinCode(e.target.value);
  };

  const checkDelivery = async () => {
    setError("");
    setDeliveryAvailable(null);
  
    if (!pinCode.trim()) {
      setError("Please enter a valid zip code.");
      return;
    }
  
    try {
      const response = await apiClient.post(`/menu/checkdelivery`, { zipCode: pinCode });
  
      if (response.ok) { 
        if (response.data.deliveryAvailable !== undefined) {
          setDeliveryAvailable(response.data.deliveryAvailable); 
        } else {
          setError("Unexpected response from server.");
        }
      } else {
        setError(response.data.message || "Unable to check delivery.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <div className="bg-yellow-400 w-auto h-auto flex flex-wrap lg:flex-nowrap p-6 items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center space-y-4 p-8 w-auto">
        <h1 className="text-5xl md:text-8xl font-bold mb-4 text-center w-auto">
          Are you starving?
        </h1>
        <p className="text-2xl md:text-4xl text-gray-700 text-center p-4 w-auto">
          Within a few clicks, find meals that are accessible near you
        </p>
        <div className="bg-white justify-center space-x-4 w-auto  p-4 rounded-md h-auto">
          <div className="flex justify-center space-x-4 w-auto md:w-64">
            <img
              src={bikeImg}
              alt="location"
              className="w-auto h-auto pt-3 pb-3"
            />
            <button
              className="bg-white text-gray-700 py-2 rounded-md"
              onClick={() => {
                setDeliveryAvailable(null);
                setPinCode("");
              }}
            >
              Delivery
            </button>
          </div>
          <hr className="w-auto" />
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
            <input
              type="number"
              id="zipCode"
              value={pinCode}
              onChange={handlePinCodeChange}
              placeholder="Enter Your Zip Code"
              className="p-3 rounded-md text-black w-auto md:w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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

          {deliveryAvailable !== null && !error && (
            <div className="mt-4 text-center text-lg">
              {deliveryAvailable ? (
                <p className="text-green-500">
                  Delivery is available in your area!
                </p>
              ) : (
                <p className="text-red-500">
                  Sorry, delivery is not available in your area.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="h-auto w-auto p-4 hover:scale-105 transform transition duration-500 ease-in-out">
        <img
          src={bowlImg}
          alt="food"
          className="w-auto h-auto md:w-96 mg:h-96 lg:h-auto lg:w-auto"
          style={{filter: "drop-shadow(1px 3px 5px  black)"}}
        />
      </div>
    </div>
  );
  
}

export default Welcome;
