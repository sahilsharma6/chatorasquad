import React from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  const images = [
    { src: "https://www.restroapp.com/blog/wp-content/uploads/2020/03/online-food-ordering-statistics-RestroApp.jpg" },
    { src: "https://via.placeholder.com/300x200/FFCC33/ffffff?text=Biryani",  },
    { src: "https://www.restroapp.com/blog/wp-content/uploads/2020/03/online-food-ordering-statistics-RestroApp.jpg" },
    { src: "https://via.placeholder.com/300x200/FF9933/ffffff?text=Samosa"},
    { src: "https://www.restroapp.com/blog/wp-content/uploads/2020/03/online-food-ordering-statistics-RestroApp.jpg" },
    { src: "https://www.restroapp.com/blog/wp-content/uploads/2020/03/online-food-ordering-statistics-RestroApp.jpg"},
  ];

  return (
    <div className="bg-yellow-500 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-white font-bold text-center mb-10">
          Our Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((dish, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={dish.src}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-4">
                <h3 className="text-xl font-semibold">{dish.name}</h3>
                <p className="text-sm">A delicious Indian dish to satisfy your cravings!</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
