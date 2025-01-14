import React from "react";
import { AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import { Link } from "react-router-dom";

const OrderItems = ({ filteredOrders, searchQuery, isMobile }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-green-200 text-green-900 border border-green-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`flex-1 ${!isMobile ? "ml-4" : ""}`}>
      <AnimatePresence>
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Your orders will appear here"}
            </p>
          </div>
        ) : (
          filteredOrders
            .slice() // Create a shallow copy to avoid mutating the original array
            .reverse() // Reverse the array to show the latest orders first
            .map((order) => (
              <Link
                to={`/order/details/${order._id}`}
                key={order._id}
                className="block border border-gray-300 rounded-lg p-6 mb-6 hover:shadow-lg transition transform hover:-translate-y-1"
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #f9fafb 100%)",
                }}
              >
                {/* Header: Order ID */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Order ID: {order._id}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on: {new Date(order.date).toLocaleDateString()} - {order.time}
                    </p>
                  </div>
                </div>

                {/* Payment and Delivery Status */}
                <div className="mt-4">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        Payment Status:
                      </h4>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClass(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        Delivery Status:
                      </h4>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getOrderStatusClass(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="mt-4 text-sm text-gray-700">
                  <p>
                    <strong>Items:</strong> {order.items.length} items
                  </p>
                  <p className="mt-2">
                    <strong>Contains:</strong>{" "}
                    <span className="text-gray-600">
                      {order.items.slice(0, 3).map((item) => item.name).join(", ")}
                      {order.items.length > 3 && " and more..."}
                    </span>
                  </p>
                </div>

                {/* Footer: Call to Action */}
                <div className="mt-6 text-right">
                  <button
                    className="text-white bg-orange-500 px-4 py-2 text-sm rounded-md shadow hover:bg-indigo-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </Link>
            ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderItems;
