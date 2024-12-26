import { useState } from "react";
import MenuCard from "../../components/admin/Menu/MenuCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([
    {
      name: "Veggies",
      type: "Veg",
      price: 45.5,
      description: "A variety of fresh, colorful market vegetables stir-fried to perfection.",
      images: [
        "https://media.istockphoto.com/id/1207271995/photo/stir-frying-and-sauteing-a-variety-of-fresh-colorful-market-vegetables-in-a-hot-steaming-wok.jpg?s=612x612&w=0&k=20&c=s9jFkKwDOhF7Mq2rG90ZeOaFHoBWhU8wv1NOaQ9FxRw=",
        "https://media.istockphoto.com/id/1300836710/photo/crop-shot-of-plate-with-colorful-healthy-sliced-vegetables-and-dips.jpg?s=612x612&w=0&k=20&c=n78ffFNdqTX_DWQoQ7ghyjlfvLxZGOHuQUa_CDjLgRs="
      ],
      isAvailable: true,
      Cuisine: "Indian",
      dateAdded: "2024-09-11",
      rating: 2,
    },
    {
      name: "Garlic Bread",
      type: "Veg",
      price: 35.0,
      description: "Crispy garlic bread toasted to perfection with a hint of herbs.",
      images: [
        "https://media.istockphoto.com/id/1181825866/photo/garlic-bread-on-rustic-wooden-table.jpg?s=612x612&w=0&k=20&c=GOfd3Gv02NI8HKIvAfsitAVBpkxtZMhXHNIwlfogdi4=",
        "https://media.istockphoto.com/id/1207305768/photo/roasted-garlic-spread-on-toasted-baguette-with-salt-pepper-thyme-and-olive-oil.jpg?s=612x612&w=0&k=20&c=Q3gZ9KadHINn3JGC-Z29NcdlU92hHLN-rqhQY4G1Uds="
      ],
      isAvailable: false,
      Cuisine: "Continental",
      rating: 4.5,
      dateAdded: "2023-11-01",
    },
    {
      name: "Veg Sandwich",
      type: "Veg",
      price: 55.0,
      description: "A delicious sandwich stuffed with fresh veggies and creamy sauces.",
      images: [
        "https://media.istockphoto.com/id/474920348/photo/vegetable-sandwichs-on-a-rustic-wood-background.jpg?s=612x612&w=0&k=20&c=zwgfwXAK80shMXwtCT0xPkI27-Rs2T-fBq7EypSJh4M=",
        "https://media.istockphoto.com/id/1164282252/photo/healthy-egg-and-celery-sandwiches-on-a-plate.jpg?s=612x612&w=0&k=20&c=1WIrPemdSU0nuVmJvR9mTXSah5cCBBKj5w0EUxLg0-4="
      ],
      isAvailable: true,
      Cuisine: "Mexican",
      dateAdded: "2024-12-01",
      rating: 4.5,
    },
    {
      name: "Roast Sandwich",
      type: "Non-Veg",
      price: 65.0,
      description: "Juicy roast beef sandwich with fresh bread and flavorful toppings.",
      images: [
        "https://media.istockphoto.com/id/175538681/photo/roast-beef-sandwiches.jpg?s=612x612&w=0&k=20&c=NVtVhqSMDy45fLwQrU-TBlrUDxNtw8s51lvmeiDYA6I=",
        "https://media.istockphoto.com/id/967728964/photo/roast-beef-sandwich-on-a-plate-with-pickles-copy-space.jpg?s=612x612&w=0&k=20&c=gbtuytLwegTij7_UbS9t_yycobcSTDSPfFaWkuaHD7I="
      ],
      isAvailable: false,
      Cuisine: "Italian",
      dateAdded: "2024-10-01",
      rating: 3,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(null);

  const handleStockToggle = (index) => {
    setMenuItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleDelete = (index) => {
    setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));
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
    className="border border-orange-500 rounded-lg px-4 py-4  w-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
  />
</div>


      {/* Menu Items */}
      <div className="flex flex-wrap gap-6 overflow-auto">
        {filteredItems.map((item, index) => (
          <MenuCard
            key={index}
            title={item.name}
            price={item.price}
            rating={item.rating}
            inStock={item.isAvailable}
            images={item.images}
            description={item.description}
            onStockToggle={() => handleStockToggle(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewMenu;
