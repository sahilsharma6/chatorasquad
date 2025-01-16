import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IndianRupee, Utensils } from "lucide-react";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";
import Dairy from '../Data/DairyProduct.json'

const FoodMenuSwiper = ({param}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await apiClient.get("/menu/toprated");
        setFoodItems(response.data);
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      }
    };
    if(!param)fetchFoodItems();
    else{
      setFoodItems(Dairy)
    }
    
  }, [param]);

  const containerVariants = {
    animate: {
      x: isHovered ? "0%" : ["0%", "-100%"],
      
      transition: {
        x: {
          repeat: Infinity,
          
          duration: foodItems.length ? foodItems.length * 2 : 12,
          ease: "linear",
        },
      },
      
    },
  };

  return (
    <div className="max-w-full mx-auto lg:px-20 py-8 overflow-hidden">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <motion.div
            whileHover={{ scale: 2 }}
            className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm">
              <Utensils />
            </span>
          </motion.div>
          <h2 className="text-yellow-500 font-semibold">POPULAR DISHES</h2>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm">
              <Utensils />
            </span>
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold">{param ?"Beverages and Dairyproduct" :'Trending Food Favorites'} </h1>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6"
          variants={containerVariants}
          animate="animate"
        >
          {[...foodItems, ...foodItems].map((item, index) => (
            <Link to={`/menu/details/${item._id}`} key={index}>
              <div
                key={index}
                className="w-72 bg-yellow-300 rounded-lg shadow-xl flex-shrink-0 p-4 h-96"
              >
                <div className="relative">
                  <div className="w-full h-48 rounded-full overflow-hidden mb-4">
                    <img
                      src={
                        item.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4HQZUwt86vrz_zqFyfLKsIkV0ZkfQoCooA&s"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gray-900 rounded-full gap-0 items-center justify-center text-white flex flex-wrap">
                    <IndianRupee />
                    <span className="text-white font-bold">
                      {" "}
                      {item?.sellingPrice}
                      {/* ferf */}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-900 text-center text-sm">
          
                  {item.description.slice(0, 150)}...
                </p>
              </div>
            </Link>
          ))}
          {[...foodItems, ...foodItems].map((item, index) => (
            <Link to={`/menu/details/${item._id}`} key={index}>
              <div
                key={index}
                className="w-72 bg-yellow-300 rounded-lg shadow-xl flex-shrink-0 p-4 h-96"
              >
                <div className="relative">
                  <div className="w-full h-48 rounded-full overflow-hidden mb-4">
                    <img
                      src={
                        item.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4HQZUwt86vrz_zqFyfLKsIkV0ZkfQoCooA&s"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gray-900 rounded-full gap-0 items-center justify-center text-white flex flex-wrap">
                    <IndianRupee />
                    <span className="text-white font-bold">
                      {" "}
                      {item?.sellingPrice}
                      {/* ferf */}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-900 text-center text-sm">
                
                  {item.description.slice(0, 150)}...
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FoodMenuSwiper;
