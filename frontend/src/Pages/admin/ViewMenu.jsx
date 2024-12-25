import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pencil, Trash } from 'lucide-react';

const MenuCard = ({ title, price, quantity, inStock, images, description }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
    className="bg-white rounded-lg shadow-lg p-4 flex-grow "
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div className="relative h-48 overflow-hidden transition-all delay-100 rounded-lg mb-4">
      <motion.img
        src={images[currentImageIndex]}
        alt={title}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button 
          onClick={prevImage} 
          className="bg-gray-800 text-white p-2 rounded-l hover:bg-gray-900"
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button 
          onClick={nextImage} 
          className="bg-gray-800 text-white p-2 rounded-r hover:bg-gray-900"
        >
          <ChevronRight />    
        </button>
      </div>
    </motion.div>

    <div className="flex justify-between items-start mb-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-yellow-500 font-medium text-2xl">${price}</span>
    </div>

    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-600">Qty: {quantity}</span>
      <span className={`text-sm px-2 py-1 rounded ${
        inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </span>
    </div>

    <p className="text-sm text-gray-600 mb-4">{description}</p>

    <div className="flex gap-4 mx-8">
      <motion.button
        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 flex-1 flex gap-5 justify-center"
        whileTap={{ scale: 0.95 }}
      >
        <Trash size={33} />
        <div>
        Delete
        </div>
      </motion.button>
      <motion.button
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 flex-1 flex gap-5 justify-center"
        whileTap={{ scale: 0.95 }}
      >
        <Pencil size={33} />
        <div>
        Edit 
        </div>
      </motion.button>
    </div>
  </motion.div>
  );
};

const ViewMenu = () => {
    const menuItems = [
        {
          name: "Veggies",
          type: "Veg",
          price: 45.50,
          description: "A variety of fresh, colorful market vegetables stir-fried to perfection.",
          images: [
            "https://media.istockphoto.com/id/1207271995/photo/stir-frying-and-sauteing-a-variety-of-fresh-colorful-market-vegetables-in-a-hot-steaming-wok.jpg?s=612x612&w=0&k=20&c=s9jFkKwDOhF7Mq2rG90ZeOaFHoBWhU8wv1NOaQ9FxRw=",
            "https://media.istockphoto.com/id/1300836710/photo/crop-shot-of-plate-with-colorful-healthy-sliced-vegetables-and-dips.jpg?s=612x612&w=0&k=20&c=n78ffFNdqTX_DWQoQ7ghyjlfvLxZGOHuQUa_CDjLgRs="
          ],
          isAvailable: true,
          Cuisine: "Indian",
          quantity:20
        },
        {
          name: "Garlic Bread",
          type: "Veg",
          price: 35.00,
          description: "Crispy garlic bread toasted to perfection with a hint of herbs.",
          images: [
            "https://media.istockphoto.com/id/1181825866/photo/garlic-bread-on-rustic-wooden-table.jpg?s=612x612&w=0&k=20&c=GOfd3Gv02NI8HKIvAfsitAVBpkxtZMhXHNIwlfogdi4=",
            "https://media.istockphoto.com/id/1207305768/photo/roasted-garlic-spread-on-toasted-baguette-with-salt-pepper-thyme-and-olive-oil.jpg?s=612x612&w=0&k=20&c=Q3gZ9KadHINn3JGC-Z29NcdlU92hHLN-rqhQY4G1Uds="
          ],
          isAvailable: false,
          Cuisine: "Continental",
          quantity:20
        },
        {
          name: "Veg Sandwich",
          type: "Veg",
          price: 55.00,
          description: "A delicious sandwich stuffed with fresh veggies and creamy sauces.",
          images: [
            "https://media.istockphoto.com/id/474920348/photo/vegetable-sandwichs-on-a-rustic-wood-background.jpg?s=612x612&w=0&k=20&c=zwgfwXAK80shMXwtCT0xPkI27-Rs2T-fBq7EypSJh4M=",
            "https://media.istockphoto.com/id/1164282252/photo/healthy-egg-and-celery-sandwiches-on-a-plate.jpg?s=612x612&w=0&k=20&c=1WIrPemdSU0nuVmJvR9mTXSah5cCBBKj5w0EUxLg0-4="
          ],
          isAvailable: true,
          Cuisine: "Mexican",
          quantity:20
        },
        {
          name: "Roast Sandwich",
          type: "Non-Veg",
          price: 65.00,
          description: "Juicy roast beef sandwich with fresh bread and flavorful toppings.",
          images: [
            "https://media.istockphoto.com/id/175538681/photo/roast-beef-sandwiches.jpg?s=612x612&w=0&k=20&c=NVtVhqSMDy45fLwQrU-TBlrUDxNtw8s51lvmeiDYA6I=",
            "https://media.istockphoto.com/id/967728964/photo/roast-beef-sandwich-on-a-plate-with-pickles-copy-space.jpg?s=612x612&w=0&k=20&c=gbtuytLwegTij7_UbS9t_yycobcSTDSPfFaWkuaHD7I="
          ],
          isAvailable: false,
          Cuisine: "Italian",
          quantity:20
        }
      ];

  return (
    <div className="flex flex-wrap gap-6 px-2 py-5 w-full"> {/* Ensure full width for the container */}
    
      {menuItems.map((item, index) => (
        <MenuCard 
        key={index}
        title={item.name}           // Passing item name as title
        price={item.price}          // Passing price
        quantity={item.quantity}    // Passing quantity
        inStock={item.isAvailable}  // Passing stock availability
        images={item.images}        // Passing images array
        description={item.description}  // Passing description
        />
      ))}
    </div>
  );
};

export default ViewMenu;