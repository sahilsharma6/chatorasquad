import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const foodItems = [
  {
    name: "Chicken Leg Piece",
    price: 20.99,
    image: "/api/placeholder/300/300",
    description: "Lorem, Ipsum Dolor..."
  },
  {
    name: "Cheese Burger",
    price: 26.99,
    image: "/api/placeholder/300/300",
    description: "Lorem, Ipsum Dolor..."
  },
  {
    name: "Chicken Biryani",
    price: 28.00,
    image: "/api/placeholder/300/300",
    description: "Lorem, Ipsum Dolor..."
  },
  {
    name: "Chicken Fried Rice",
    price: 100.99,
    image: "/api/placeholder/300/300",
    description: "Lorem, Ipsum Dolor..."
  }
];

const FoodMenuSlider = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < foodItems.length) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm">M</span>
          </motion.div>
          <h2 className="text-pink-500 font-semibold">BEST FOOD</h2>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm">M</span>
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold">Trending Food Favorites</h1>
      </div>

      <div className="relative h-96 overflow-hidden">
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full flex justify-center items-center"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-72">
            <div className="relative">
              <div className="w-full h-48 rounded-full overflow-hidden mb-4">
                <img
                  src={foodItems[currentIndex].image}
                  alt={foodItems[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-white font-bold">${foodItems[currentIndex].price}</span>
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">{foodItems[currentIndex].name}</h3>
            <p className="text-gray-500 text-center text-sm">{foodItems[currentIndex].description}</p>
          </div>
        </motion.div>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg disabled:opacity-50"
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg disabled:opacity-50"
          onClick={() => paginate(1)}
          disabled={currentIndex === foodItems.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {foodItems.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-pink-500' : 'bg-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodMenuSlider;