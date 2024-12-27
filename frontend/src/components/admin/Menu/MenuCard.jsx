import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pencil, Star, Trash } from "lucide-react";
import { useState } from "react";
import { FaStarHalfAlt } from "react-icons/fa";

const MenuCard = ({ 
  title, 
  price, 
  rating, 
  inStock, 
  images, 
  description, 
  onDelete, 
  onStockToggle 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInStock, setIsInStock] = useState(inStock);

  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleStockToggle = () => {
    const updatedStockStatus = !isInStock;
    setIsInStock(updatedStockStatus);
    onStockToggle(updatedStockStatus); // Inform parent component
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-4 flex-grow "
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div className="relative h-52 overflow-hidden transition-all delay-100 rounded-lg mb-4">
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
        <div className="flex items-center">
          {[...Array(totalStars)].map((_, index) => {
            if (index < filledStars) {
              return <span key={index} className="text-yellow-500"><Star className="fill-yellow-500" /> </span>;
            } else if (index === filledStars && hasHalfStar) {
              return <span key={index} className="text-yellow-500"><FaStarHalfAlt /> </span>;
            } else {
              return <span key={index} className="text-gray-300"><Star className="text-yellow-500" /> </span>;
            }
          })}
        </div>
        <div className="flex gap-3 items-center">
  <label className="inline-flex items-center cursor-pointer relative group">
    <input 
      type="checkbox" 
      checked={isInStock} 
      onChange={handleStockToggle} 
      className="sr-only peer" 
    />
    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-yellow-600 rounded-full peer dark:bg-yellow-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-orange-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
    {/* Tooltip */}
    <span className="absolute w-32 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 transition-opacity group-hover:opacity-100">
      {isInStock ? 'Click to mark as Out of Stock' : 'Click to mark as In Stock'}
    </span>
  </label>
  <span
    className={`text-sm px-2 py-1 rounded ${
      isInStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}
  >
    {isInStock ? 'In Stock' : 'Out of Stock'}
  </span>
</div>

      </div>

      <p className="text-md text-gray-600 mb-4">{description}</p>

      <div className="flex gap-4 mx-8">
        <motion.button
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 flex-1 flex gap-5 justify-center"
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
        >
          <Trash size={33} />
          <div>Delete</div>
        </motion.button>
        <motion.button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 flex-1 flex gap-5 justify-center"
          whileTap={{ scale: 0.95 }}
        >
          <Pencil size={33} />
          <div>Edit</div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MenuCard;
