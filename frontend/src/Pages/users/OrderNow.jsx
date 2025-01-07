import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom"; 
import {
  Clock,
  MapPin,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";
import apiClient from "../../services/apiClient";

const OrderNow = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/menu/getdetails/${id}`);
        setProductData(response.data);
        setSelectedImage(response.data.images[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const deliveryAddress = {
    name: "Rudra Maity",
    zipCode: 721626,
    city: "abch",
    state: "West Bengal",
    location: " abc school",
  };

  const formattedAddress = JSON.stringify(deliveryAddress);


  const handlePayment = async () => {
    try {
      const response = await apiClient.post("/user/pay", {
        userId: "60f1b0b3b3b3b30015f1b0b3", 
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString(),
        items: [
          {
            itemid: productData._id, 
            name: productData.name, 
            quantity,
            price: productData.sellingPrice, 
          },
        ],
        total: productData.sellingPrice * quantity,
        deliveryAddress: formattedAddress, 
      });

      if (response.data.url) {
        window.location.href = response.data.url; 
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                src={selectedImage || productData.imageUrl} 
                alt={productData.name}
                className="w-20 h-25 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{productData.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold">₹{productData.price}</span>
                      <span className="text-gray-500 line-through text-sm">
                        ₹{productData.originalPrice}
                      </span>
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
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-800">Delivery Address</h3>
            <p>{deliveryAddress.name}</p>
            <p>{deliveryAddress.location}</p>
            <p>
              {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.zipCode}
            </p>
          </motion.div>
        </div>

        {/* Total Amount */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between mb-4">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="text-xl font-semibold text-gray-800">
                ₹{productData.price * quantity}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Continue to Payment <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
