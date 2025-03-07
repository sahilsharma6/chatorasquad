import React, { useEffect, useState, useContext } from "react";
import CartItems from "../../components/CartItems";
import { ShieldCheck } from "lucide-react";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import apiClient from "../../services/apiClient";
import { UserContext } from "../../context/UserContext";

const ViewCart = () => {
  const { cartItems = [], updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

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

    fetchAddresses();

    return () => clearTimeout(timer);
  }, []);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const handlePayment = async () => {
    const items = cartItems;

    if (items.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    const userId = user?._id;

    const payload = {
      userId,
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      items: items.map((item) => ({
        itemid: item.itemId || item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.sellingPrice || item.price,
      })),
      total: items.reduce(
        (sum, item) => sum + item.sellingPrice ||item.price* item.quantity,
        0
      ),
      deliveryAddress: selectedAddress,
    };

    try {
      console.log(payload);
      
      const response = await apiClient.post("/user/pay", payload);

      if (response.data.url) {
        setPaymentProcessing(true);

        window.location.href = response.data.url;
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (cartItems.length < 1) {
    return (
      <NoResults
        img={
          "https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
        }
        title={"Your Cart is Empty"}
        des={"Cart is Empty. Please go to menu and add some dishes to cart."}
      />
    );
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.sellingPrice ||item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="max-w-full mx-auto p-4 bg-white rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 min-h-screen overflow-y-auto shadow px-4 py-4">
          {cartItems.map((item) => (
            <CartItems
              key={item.itemId}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
          <button
            onClick={handlePayment}
            className={`w-full text-center flex items-center justify-center mt-4 px-3 py-3 ${
              paymentProcessing ? "bg-gray-400" : "bg-orange-500"
            } text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold`}
            disabled={paymentProcessing}
          >
            {paymentProcessing ? "Processing..." : "Place Order"}
          </button>
        </div>
        <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg sticky shadow top-4">
          <h3 className="font-semibold mb-4">Price Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>
                Price ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                items)
              </span>
              <span>₹{totalAmount}</span>
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
              <span>₹{totalAmount + 3}</span>
            </div>
          </div>

          <h3 className="font-semibold mt-6 mb-4">Select Delivery Address</h3>
          <div className="space-y-2">
            {addresses.length === 0 ? (
              <NoResults title="No addresses found" />
            ) : (
              addresses.map((address) => (
                <div
                  key={address._id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedAddress?._id === address._id
                      ? "border-orange-500 bg-orange-100"
                      : "border-gray-300"
                  } hover:shadow-md`}
                  onClick={() => handleAddressChange(address)}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
       
                    <span className="text-sm sm:text-base">
                      {address.location}, {address.city}, {address.state} -{" "}
                      {address.zipCode}
                    </span>

               
                    {selectedAddress?._id === address._id && (
                      <span className="text-sm sm:text-base rounded-lg bg-orange-200 text-center py-1 px-2  text-orange-600 font-semibold">
                        Selected Address
                      </span>
                    )}

                 
                    {address.type === "default" && (
                      <span className=" bg-green-100 rounded-lg text-center text-sm py-1 px-2 sm:text-base text-green-600 font-semibold">
                        Default Address
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck size={58} className="fill-slate-700 text-white sha" />
            <span>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewCart;
