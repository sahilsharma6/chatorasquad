import { useState, useEffect } from "react";
import MenuCard from "../../components/admin/Menu/MenuCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";  
import { toast, ToastContainer } from 'react-toastify';
import { Pagination } from "../../components/Pagination";

const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2; // Set the number of items per page
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await apiClient.get(`/menu/all?page=${currentPage}&limit=${itemsPerPage}`);
        setMenuItems(response.data.menu); // Adjust based on your API response structure
        setTotalPages(response.data.totalPages); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, [currentPage]);

  const handleStockToggle = (index) => {
    const updatedItem = { ...menuItems[index], isAvailable: !menuItems[index].isAvailable };
    apiClient.put(`/menu/updateAvailability/${menuItems[index]._id}`, updatedItem).then((response) => {
      setMenuItems((prevItems) =>
        prevItems.map((item, i) => (i === index ? response.data.updatedItem : item))
      );
      toast.success('Stock status updated successfully', {
        position: "top-right",
        autoClose: 2000,
      });
    }).catch((error) => {
      console.error("Error updating stock status:", error);
    });
  };

  const openDeleteModal = (index) => {
    setItemToDelete(index);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/menu/delete/${menuItems[itemToDelete]._id}`);  
      setMenuItems((prevItems) => prevItems.filter((_, i) => i !== itemToDelete));  
      toast.success('Item deleted successfully', {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error('Error deleting item', {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setShowModal(false); 
      setItemToDelete(null);
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock" && item.isAvailable) ||
      (stockFilter === "Out of Stock" && !item.isAvailable);

    const matchesDate =
      !dateFilter ||
      new Date(item.dateAdded).toDateString() === dateFilter.toDateString();

    return matchesSearch && matchesStock && matchesDate;
  });

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-5 w-full">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-orange-500 rounded-lg px-3 py-4 w-full md:w-1/3 shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="border border-orange-500 rounded-lg px-3 py-4 w-full md:w-1/3 shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <DatePicker
          selected={dateFilter}
          onChange={(date) => setDateFilter(date)}
          placeholderText="Filter by Date"
          className="border border-orange-500 rounded-lg px-4 py-4 w-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Menu Items */}
      <div className="flex flex-wrap gap-6 overflow-hidden">
        {filteredItems.map((item, index) => (
          <MenuCard
            id={item._id}
            key={index}
            title={item.name}
            price={item.sellingPrice}
            rating={item.rating}
            inStock={item.isAvailable}
            images={item.images}
            description={item.description}
            onStockToggle={() => handleStockToggle(index)}
            onDelete={() => openDeleteModal(index)} 
            onEdit={() => navigate(`/admin/menu/edit/${item._id}`)}  
          />
        ))}
      </div>

      {/* Pagination Controls */}
     <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewMenu