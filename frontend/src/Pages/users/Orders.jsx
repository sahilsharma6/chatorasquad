import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ListFilter } from "lucide-react";
import SearchBar from "../../components/users/OrderSearchBar";
import OrderItems from "../../components/users/OrderItems";
import { UserContext } from "../../context/UserContext";
import apiClient from "../../services/apiClient";

const OrdersPage = () => {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/user/getallorders/${user._id}`);

      if (response.status === 200) {
        setOrders(response.data || []);
      } else {
        console.error("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        <div className={isMobile ? "sticky top-0 bg-white border-b z-10" : ""}>
          <div className="p-4 flex items-center space-x-3">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <button
              onClick={() => alert("Filters will be added later")}
              className="flex items-center space-x-1 px-3 py-2 border rounded-lg"
            >
              <span>
                <ListFilter size={33} />
              </span>
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <OrderItems orders={orders} searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
