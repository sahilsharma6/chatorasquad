import React, { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IndianRupee, MoveDown, MoveUp, X } from "lucide-react";
import TableModal from "../../components/admin/offers/TableModal";
import SparklineChart from "../../components/admin/offers/SparklineChart";

const AdminOfferPage = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Veggies",
      price: 45.5,
      offer: 10,
      offerDates: "2024-01-01 to 2024-01-15",
      date: "2023-01-01"
    },
    {
      id: 2,
      name: "Garlic Bread",
      price: 35.0,
      offer: 15,
      offerDates: "2024-02-01 to 2024-02-10",
      date: "2024-06-07"
    },
    {
      id: 3,
      name: "Veg Sandwich",
      price: 55.0,
      offer: 5,
      offerDates: "2024-01-20 to 2024-01-30",
      date: "2024-11-21"
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState([null, null]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [offer, setOffer] = useState(0);
  const [offerDates, setOfferDates] = useState([null, null]);

  const toggleSort = (column) => {
    const sortedItems = [...menuItems].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
    setMenuItems(sortedItems);
  };

  const handleCellClick = (item) => {
    setSelectedItem(item);
    setOffer(item.offer || 0);
    setOfferDates(item.offerDates.split(" to ").map((date) => new Date(date)));
    setIsModalOpen(true);
  };

  const handleUpdateOffer = () => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              offer,
              offerDates: offerDates.map((date) => date.toISOString().split("T")[0]).join(" to "),
            }
          : item
      )
    );
    setIsModalOpen(false);
  };

  const isDateInRange = (offerDates, range) => {
    const [startFilter, endFilter] = range.map((d) => d && d.getTime());
    const [startOffer, endOffer] = offerDates.split(" to ").map((d) => new Date(d).getTime());

    if (!startFilter || !endFilter) return true; // No filter applied
    return (
      (startOffer >= startFilter && startOffer <= endFilter) || 
      (endOffer >= startFilter && endOffer <= endFilter) || 
      (startOffer <= startFilter && endOffer >= endFilter) 
    );
  };

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      isDateInRange(item.offerDates, dateRangeFilter)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Offer Page</h1>
      {/* Filters */}
      <div className="flex gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-4 w-full md:w-1/3"
        />
        <DatePicker
          selectsRange
          startDate={dateRangeFilter[0]}
          endDate={dateRangeFilter[1]}
          onChange={(update) => setDateRangeFilter(update)}
          placeholderText="Filter by Date Range"
          className="border rounded-lg px-4 py-4 w-full "
        />
      </div>

<div className="overflow-x-auto shadow-lg ">


      {/* Table */}
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="table-auto w-full  border border-gray-200 rounded-lg shadow-lg overflow-auto "
      >
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-4">Name</th>
            <th
              className="p-4 cursor-pointer"
              onClick={() => toggleSort("price")}
            >
                <div className="flex">
                    Price
                </div>
               {sortColumn === "price" && (sortOrder === "asc" ? <MoveUp /> : <MoveDown />)}
            </th>
            <th
              className="p-4 cursor-pointer"
              onClick={() => toggleSort("offer")}
            >
                <div className="flex">
                     Offer (%)
                </div>
              {sortColumn === "offer" && (sortOrder === "asc" ? <MoveUp /> : <MoveDown />)}
            </th>
            <th className="p-4">Offer Date Range</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <motion.tr
              key={item.id}
              className="hover:bg-orange-100 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCellClick(item)}
            >
              <td className="p-4 border">{item.name}</td>
              <td className="p-4 border flex"><IndianRupee className="mt-1" /> {item.price}</td>
              <td className="p-4 border">{item.offer}%</td>
              <td className="p-4 border">{item.offerDates}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table></div>

      {/* Modal */}
      <TableModal selectedItem={selectedItem} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} offer={offer} offerDates={offerDates} setOffer={setOffer} setOfferDates={setOfferDates} handel handleUpdateOffer={handleUpdateOffer} />
       <SparklineChart data={menuItems} />
    </div>
  );
};

export default AdminOfferPage;
