import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import HeroImg1 from "../assets/heroimage1.png";
import HeroImg2 from "../assets/heroimage2.png";
import HeroImg3 from "../assets/heroimage3.png";

const HeroSection = () => {
  return (
    <section className="relative lg:h-screen pb-20   bg-white  px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center overflow-hidden">
  
      <div className="absolute top-[-50px] right-[10px] md:top-[-30px] md:right-[50px] z-0">
        <img
          src={HeroImg2}
          alt="Leaf Background"
          className="w-[150px] md:w-[250px] "
        />
      </div>
      <div className="absolute top-[20%] right-[150px] md:top-[10%] md:right-[300px] z-0">
        <img
          src={HeroImg3}
          alt="Leaf Background"
          className="w-[200px] md:w-[350px] "
        />
      </div>

      {/* Left Content */}
      <div className="relative md:w-1/2 lg:pt-0 md-pt-0 pt-10 space-y-10 z-10 text-center md:text-left">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-gray-800"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          We provide the best food for you
        </motion.h1>
        <motion.p
          className="text-gray-600 text-sm md:text-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </motion.p>

     
        <motion.div
          className="space-x-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/menu" className="bg-gray-900 text-white px-6 py-2 rounded-tl-lg rounded-br-lg hover:bg-gray-700">
            Menu
          </Link>
          <Link to="/orders" className="bg-orange-500 text-white px-6 py-2 rounded-tl-lg rounded-br-lg hover:bg-orange-600">
            Orders
          </Link>
        </motion.div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start space-x-4 text-gray-600">
          <FaFacebook className="hover:text-gray-800" />
          <FaInstagram className="hover:text-gray-800" />
          <FaTwitter className="hover:text-gray-800" />
        </div>
      </div>

 
      <motion.div
        className="relative mt-8 md:mt-0 md:w-1/2 z-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
     
        <div>
          <img
            src={HeroImg1}
            alt="Dish"
            className="rounded-md hidden md:block lg:block w-[400px] md:w-[500px]"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
