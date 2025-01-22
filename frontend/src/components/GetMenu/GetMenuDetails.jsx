import React, { useEffect, useState } from "react";
import { MapPin, Share, ShieldCheck, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import apiClient from "../../services/apiClient";

const GetMenuDetails = ({ dishDetails }) => {
  const { addToCart } = useCart();
  const [pinCode, setPinCode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [Ratings, setRatings] = useState({ rating: 0 });
  const [Reviews, setReviews] = useState([]);
  const { 
    name, 
    description, 
    sellingPrice, 
    discountedPrice, 
    title, 
    Cuisine, 
    isAvailable, 
    type 
  } = dishDetails;

  const { id } = useParams();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await apiClient.get(`/menu/rating/${id}`);
        setRatings(response.data);
      } catch (error) {
        setRatings({ rating: 0 });
        console.error("Failed to fetch ratings:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(`/menu/reviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        setReviews([]);
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchRatings();
    fetchReviews();
  }, [id]);

  const checkDelivery = async () => {
    if (!pinCode.trim()) {
      setDeliveryMessage("Please enter a valid pincode.");
      return;
    }

    // Animate loading state
    setDeliveryMessage("Checking delivery status...");

    try {
      const response = await apiClient.post(`/menu/checkdelivery`, {
        zipCode: pinCode,
      });
      setDeliveryMessage(
        response.data.deliveryAvailable
          ? "✨ Delivery is available in your area!"
          : "😔 Sorry, delivery is not available in your area."
      );
    } catch (error) {
      setDeliveryMessage(
        "🚫 Unable to check delivery at the moment. Please try again later."
      );
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setToastMessage("✨ Added to cart successfully!");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const discount = Math.round((sellingPrice - discountedPrice) * 100 / sellingPrice);

  return (
    <>
    <div className="md:w-1/2 shadow-xl py-8 px-6 bg-white rounded-xl transition-all duration-300 hover:shadow-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between group">
        <h1 className="text-2xl font-bold transition-all duration-300 group-hover:text-orange-500">
          {name}
        </h1>
        <div className="relative group">
          <Share className="w-6 h-6 text-gray-500 cursor-pointer transition-all duration-300 hover:text-orange-500 hover:scale-110" />
          <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Share
          </span>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="flex items-center gap-4 mt-6">
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-transform duration-300 hover:scale-105">
          {Ratings.rating || 0} ★
        </div>
        <span className="text-gray-500 text-sm">{Reviews.length} Reviews </span>
        <ShieldCheck size={24} className="text-green-500 animate-pulse" />
      </div>

      {/* Price Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <span className="text-green-600 text-sm font-medium">Special Price</span>
        <div className="flex items-baseline gap-3 mt-2">
          <span className="text-3xl font-bold text-gray-900">₹{discountedPrice}</span>
          <span className="text-gray-500 line-through text-lg">₹{sellingPrice}</span>
          <span className="text-red-500 font-medium bg-red-50 px-2 py-1 rounded-full text-sm">
            {discount}% OFF
          </span>
        </div>
      </div>

      {/* Delivery Section */}
      <div className="mt-8">
        <h3 className="font-medium mb-3">Quick Delivery Check</h3>
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg focus-within:ring-2 focus-within:ring-orange-500 transition-all duration-300">
          <MapPin className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter Delivery Pincode"
            className="bg-transparent border-none outline-none flex-1"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <button 
            onClick={checkDelivery}
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors duration-300"
          >
            Check
          </button>
        </div>
        {deliveryMessage && (
          <div className="mt-2 text-sm text-gray-600 animate-fadeIn">
            {deliveryMessage}
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="mt-8 border-t pt-4">
        <div className="space-y-4">
          {[
            { label: "Title", value: title || "No Title" },
            { label: "Stock", value: isAvailable ? "In Stock" : "Out Of Stock" },
            { label: "Cuisine", value: Cuisine },
            { label: "Dish Type", value: type }
          ].map((detail, index) => (
            <div key={index} className="flex items-start justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-300">
              <span className="text-gray-500 w-1/4">{detail.label}</span>
              <span className="w-3/4 font-medium">{detail.value}</span>
            </div>
          ))}
          
          <div className="relative">
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-300"
            >
              Description
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isDescriptionExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className={`mt-2 transition-all duration-300 overflow-hidden ${
              isDescriptionExpanded ? "max-h-96" : "max-h-0"
            }`}>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 sticky">
        <Link
          to={`/menu/order/${id}`}
          className="flex-1 text-center bg-orange-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-1"
        >
          ORDER NOW
        </Link>

        <button
          className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
          onClick={() => handleAddToCart(dishDetails)}
        >
          ADD TO CART
        </button>
      </div>

      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-xl shadow-xl animate-slideUp">
          {toastMessage}
        </div>
      )}
    </div>
    </>
  );
};

export default GetMenuDetails;