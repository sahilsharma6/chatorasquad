import { useState, useEffect } from "react";
import MenuCard from "../../components/admin/Menu/MenuCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation

const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(null);
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await apiClient.get("/menu/all");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleStockToggle = (index) => {
    const updatedItem = { ...menuItems[index], isAvailable: !menuItems[index].isAvailable };
    apiClient.put(`/admin/menu/updatestock/${menuItems[index]._id}`, updatedItem).then((response) => {
      setMenuItems((prevItems) =>
        prevItems.map((item, i) => (i === index ? response.data : item))
      );
    }).catch((error) => {
      console.error("Error updating stock status:", error);
    });
  };

  const handleDelete = async (index) => {
    try {
      await apiClient.delete(`/admin/menu/deleteItem/${menuItems[index]._id}`);  
      setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));  
    } catch (error) {
      console.error("Error deleting item:", error);
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
      <div className="flex flex-wrap gap-6 overflow-auto">
        {filteredItems.map((item, index) => (
          <MenuCard
            key={index}
            title={item.name}
            price={item.sellingPrice}
            rating={item.rating}
            inStock={item.isAvailable}
            images={item.images}
            description={item.description}
            onStockToggle={() => handleStockToggle(index)}
            onDelete={() => handleDelete(index)}
            onEdit={() => navigate(`/admin/menu/edit/${item._id}`)}  
          />
        ))}
      </div>
    </div>
  );
};

export default ViewMenu;
