import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus, ChevronRight, CheckCircle } from "lucide-react";
import apiClient from "../../services/apiClient";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const OrderNow = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { user } = useContext(UserContext);

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

    const fetchAddresses = async () => {
      try {
        const response = await apiClient.get("/user/getaddresses");
        const fetchedAddresses = response.data;
        setAddresses(fetchedAddresses);
        const defaultAddress = fetchedAddresses.find(
          (addr) => addr.type === "default"
        );
        setSelectedAddress(defaultAddress || fetchedAddresses[0]);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchProduct();
    fetchAddresses();
  }, [id]);

  const handlePayment = async () => {
    try {
      const response = await apiClient.post("/user/pay", {
        itemid: productData._id,
        userId: user?._id,
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
        deliveryAddress: selectedAddress,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
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
                src={ import.meta.env.VITE_API_URL + "/" + selectedImage || productData.images[0]}
                alt={productData.name}
                className="w-20 h-25 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {productData.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold">
                        ₹{productData.sellingPrice}
                      </span>
                      {productData.discountPrice && (
                        <span className="text-green-600 text-sm">
                          Save ₹{productData.discountPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-green-600">
                    Delivery by {productData.deliveryDate} |{" "}
                    {productData.deliveryCharge}
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

          {/* Address Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Delivery Address
            </h3>
            {addresses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">
                  No delivery addresses found.
                </p>
                <Link
                  to="/profile"
                  className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Add Address in Profile
                </Link>
              </div>
            ) : (
              addresses.map((address, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg my-2 cursor-pointer flex justify-between items-center ${
                    selectedAddress?._id === address._id
                      ? "border-orange-500 bg-orange-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleAddressChange(address)}
                >
                  <div>
                    {address.location}, {address.city}, {address.state} -{" "}
                    {address.zipCode}
                  </div>
                  <div className="flex items-center gap-2">
                    {address.type === "default" && (
                      <span className="text-sm text-green-600 font-semibold">
                        Default Address
                      </span>
                    )}
                    {selectedAddress?._id === address._id && (
                      <div className="flex items-center text-orange-500 gap-1">
                        <CheckCircle size={16} />
                        <span className="text-sm font-medium">
                          Selected now
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>

        {/* Total Amount */}
        <div>
          {/* Total Amount */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Item Price</span>
                <span>₹{productData.sellingPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Charges</span>
                <span>₹{productData.deliveryCharge || "Free"}</span>
              </div>
              {productData.discountPrice && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>- ₹{productData.discountPrice}</span>
                </div>
              )}
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>
                  ₹
                  {productData.sellingPrice * quantity +
                    (productData.deliveryCharge || 0) -
                    (productData.discountPrice || 0)}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              className="w-full py-3 flex items-center justify-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold gap-2"
            >
              <span>Proceed to Payment</span>
              <ChevronRight size={18} className="mt-[2px]" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
