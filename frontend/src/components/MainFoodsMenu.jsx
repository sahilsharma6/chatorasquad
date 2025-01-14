import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Search, Filter, X } from "lucide-react";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";
const categories = [
  { id: "fast-food", name: "", icon: "" },
  { id: "drinks", name: "  ", icon: "" },
  { id: "pizza", name: " ", icon: "" },
  { id: "pasta", name: "", icon: "" },
];

const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "low", label: "Under ₹10" },
  { id: "mid", label: "₹10 - ₹20" },
  { id: "high", label: "Above ₹20" },
];

const FoodMainMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

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

  // Memoized filtering to improve performance
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        selectedPriceRange === "all" ||
        (selectedPriceRange === "low" && item.sellingPrice < 10) ||
        (selectedPriceRange === "mid" &&
          item.sellingPrice >= 10 &&
          item.sellingPrice <= 20) ||
        (selectedPriceRange === "high" && item.sellingPrice > 20);

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [menuItems, selectedCategory, searchQuery, selectedPriceRange]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedPriceRange("all");
    setIsMobileFiltersOpen(false);
  };

  return (
    <div className="max-w-full mx-auto px-20 py-6 sm:py-12 bg-gray-100 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs sm:text-sm">
              <Utensils size={16} />
            </span>
          </motion.div>
          <h2 className="text-yellow-500 font-semibold text-sm sm:text-base">
            FOOD MENU
          </h2>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs sm:text-sm">
              <Utensils size={16} />
            </span>
          </motion.div>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8">
          ChatoraSquad Foods Menu
        </h1>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-center mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2"
          >
            <Filter size={20} />
            {isMobileFiltersOpen ? "Close Filters" : "Open Filters"}
          </motion.button>
        </div>

        {/* Categories and Filters Container */}
        <div
          className={`
          ${isMobileFiltersOpen ? "block" : "hidden"} 
          md:block space-y-4 md:space-y-0
        `}
        >
          {/* Categories */}
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-8 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base rounded-full ${
                selectedCategory === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </motion.button>
            {categories?.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base rounded-full ${
                  selectedCategory === category.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="text-base sm:text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4 sm:mb-8">
            {/* Search Input */}
            <div className="relative w-full sm:w-2/5">
              <input
                type="text"
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-4 py-2 text-xs sm:text-base border rounded-lg focus:outline-none focus:ring focus:border-yellow-500"
              />
              <Search
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            {/* Price Range Dropdown */}
            <div className="relative w-full sm:w-1/5">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-4 py-2 text-xs sm:text-base border rounded-lg focus:outline-none focus:ring focus:border-yellow-500 appearance-none"
              >
                {priceRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
              <Filter
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            {/* Reset Filters Button */}
            {(selectedCategory !== "all" ||
              searchQuery !== "" ||
              selectedPriceRange !== "all") && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="px-3 py-2 text-xs sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
              >
                <X size={16} /> Reset
              </motion.button>
            )}
          </div>
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mb-8 text-sm sm:text-base">
            No items match your current filters. Try adjusting your search or
            filters.
          </div>
        )}
      </div>

      {/* Menu Items */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8  py-4 sm:py-6 px-2 sm:px-4"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <Link
              to={`/menu/details/${item._id}`}
              key={item._id}
              className="w-full"
            >
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl hover:bg-yellow-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hover:text-white shadow-md cursor-pointer flex-wrap"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={import.meta.env.VITE_API_URL + "/" + item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm sm:text-lg font-bold">{item.name}</h3>
                  <p className="text-xs sm:text-sm">{item.description}</p>
                </div>
                <div className="text-base sm:text-xl font-bold text-black">
                  ₹{item?.sellingPrice}
                </div>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FoodMainMenu;
