import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import apiClient from '../../services/apiClient';
import { Share, MapPin, Info, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext'; 

export default function GetMenuDetails() {
  const { id } = useParams(); 
  const [dishDetails, setDishDetails] = useState(null);
  const [pinCode, setPinCode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const response = await apiClient.get(`/menu/getdetails/${id}`);
        setDishDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch dish details:', error);
      }
    };

    fetchDishDetails();
  }, [id]);

  const checkDelivery = async () => {
    if (!pinCode.trim()) {
      setDeliveryMessage('Please enter a valid pincode.');
      return;
    }

    try {
      const response = await apiClient.post(`/menu/checkdelivery`, { zipCode: pinCode });
      if (response.data.deliveryAvailable) {
        setDeliveryMessage('Delivery is available in your area!');
      } else {
        setDeliveryMessage('Sorry, delivery is not available in your area.');
      }
    } catch (error) {
      setDeliveryMessage('Unable to check delivery at the moment. Please try again later.');
    }
  };


  const handleAddToCart = (item) => {
    addToCart(item);
    setToastMessage('Item added to cart!');
    setTimeout(() => setToastMessage(''), 1000);
  };

  if (!dishDetails) return <p>Loading...</p>;

  const { sellingPrice, description, name } = dishDetails;

  return (
    <div className="md:w-1/2 shadow-lg py-6 px-6 bg-gray-100 rounded">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">{name}</h1>
        <Share className="w-6 h-6 text-gray-500 cursor-pointer" />
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="bg-green-500 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
          4.1 ★
        </div>
        <span className="text-gray-500">3,175 Ratings & 266 Reviews</span>
        <ShieldCheck size={30} className="text-green-500" />
      </div>

      <div className="mt-6">
        <span className="text-green-600 text-sm font-medium">Special price</span>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-2xl font-medium">₹</span>
          <span className="text-green-600 font-medium">
            {sellingPrice} <span className="text-gray-500">only</span>
          </span>
        </div>
      </div>

      {/* Delivery Section */}
      <div className="mt-6">
        <h3 className="font-medium mb-3">Delivery</h3>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <input
            type="text"
            placeholder="Enter Delivery Pincode"
            className="border-none outline-none"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <button onClick={checkDelivery} className="text-blue-600 font-medium">Check</button>
        </div>
        {deliveryMessage && (
          <div className="mt-2 text-sm text-gray-600">
            {deliveryMessage}
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-start">
          <div className="w-1/4">
            <h3 className="text-gray-500">Description</h3>
          </div>
          <div className="w-3/4">
            <p>{description}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold"
        >
          ORDER NOW
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold"
          onClick={() => handleAddToCart(dishDetails)}
        >
          ADD TO CART
        </motion.button>
      </div>

      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
