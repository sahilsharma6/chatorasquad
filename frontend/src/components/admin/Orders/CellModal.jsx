import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function CellModal({ setSelectedRow, selectedRow }) {
  const [status, setStatus] = useState('');
  const [OrderItm, setOrderItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const FetchOrderDetails = async () => {
      try {
        const res = await apiClient.get(`/admin/orderdetails/${selectedRow.id}`);
        if (res.status === 200) {
          const selectedItem = res.data.order.items.find((item) => item._id === selectedRow.item);
          if (selectedItem) {
            const result = {
              item: selectedItem,
              order: { ...res.data.order, items: undefined }
            };
            setOrderItem(result);
          }
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    if (selectedRow) {
      FetchOrderDetails();
      setStatus(selectedRow.status);
    }
  }, [selectedRow]);

  const updateOrderStatus = async (updatedOrder) => {
    try {
      const res = await apiClient.put(`/admin/updateorderstatus/${updatedOrder.id}`, {
        orderStatus: updatedOrder.status,
      });
      if (res.status === 200) {
        navigate('/admin/orders');
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  const handleSaveChanges = () => {
    if (selectedRow) {
      const updatedOrder = {
        ...selectedRow,
        status,
      };
      updateOrderStatus(updatedOrder);
      closeModal();
    }
  };

  const getStatusstyle = (status) => {
    if (status === "Pending") {
      return (
        <>
          <option value="Confirm" className="hover:bg-orange-400">Confirm</option>
          <option value="Delivered" className="hover:bg-orange-400">Delivered</option>
          <option value="Cancel" className="hover:bg-orange-400">Cancel</option>
        </>
      );
    } else if (status === "Confirm") {
      return (
        <>
          <option value="Delivered" className="hover:bg-orange-400">Delivered</option>
          <option value="Cancel" className="hover:bg-orange-400">Cancel</option>
          <option value="Refund" className="hover:bg-orange-400">Refund</option>
        </>
      );
    } else if (status === "Delivered") {
      return <option value="Refund" className="hover:bg-orange-400">Refund</option>;
    }
    return '';
  };

  return (
    <AnimatePresence>
      {selectedRow && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full max-h-screen overflow-auto transform transition-all duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 800, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Order Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-orange-100 rounded-full transition-all delay-100 p-1"
                aria-label="Close modal"
              >
                <X size={34} />
              </button>
            </div>

            <div className="space-y-2">
              <p>
                <strong>#Order Id:</strong> {selectedRow?.id || "N/A"}
              </p>
              <p>
                <strong>#Item Id:</strong> {OrderItm?.item?._id || "N/A"}
              </p>
              <p>
                <strong>Order Item Name:</strong> {OrderItm?.item?.name || "N/A"}
              </p>
              <p>
                <strong>Order Item Quantity:</strong> {OrderItm?.item?.quantity || "N/A"}
              </p>
              <p>
                <strong>Customer Name:</strong> {selectedRow?.Name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {selectedRow?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRow?.phone || "N/A"}
              </p>
              <p>
                <strong>Value:</strong> ₹{selectedRow?.value?.toLocaleString() || "0"}
              </p>
              <p>
                <strong>City:</strong> {OrderItm?.order?.deliveryAddress?.city || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {OrderItm?.order?.deliveryAddress?.location || "N/A"}
              </p>
              <p>
                <strong>State:</strong> {OrderItm?.order?.deliveryAddress?.state || "N/A"}
              </p>
              <p>
                <strong>Zip Code:</strong> {OrderItm?.order?.deliveryAddress?.zipCode || "N/A"}
              </p>
              <p>
                <strong>Address Type:</strong> {OrderItm?.order?.deliveryAddress?.type || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {selectedRow?.Date || "N/A"}
              </p>
            </div>
            <motion.div className="mx-auto flex mt-4">
              <div className="mx-auto">
                <label
                  htmlFor="orderStatus"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Update Order Status
                </label>
                <select
                  id="orderStatus"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={selectedRow.status} disabled>{selectedRow.status}</option>
                  {getStatusstyle(selectedRow.status)}
                </select>
              </div>
              <div className="mx-auto mt-6">
                <motion.button
                  className="bg-orange-500 text-white p-3 rounded-md shadow hover:scale-105 transition-all delay-100"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}