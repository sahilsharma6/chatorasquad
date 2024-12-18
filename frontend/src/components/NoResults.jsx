import React from "react";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom'
import { TicketX } from "lucide-react";

const NoResults = ({img,title,des}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen bg-gray-50 shadow-lg rounded-lg " 
    >
      <motion.img
        src={img} // Replace with your custom illustration/image URL
        alt="No Results"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-48 h-48"
      />
      <h1 className="text-2xl font-semibold text-gray-700 mt-4">
       {title}
      </h1>
      <div className="flex mt-3 justify-center">
        <TicketX size={56} />
         <p className="text-gray-500 text-center px-4">
        Sorry, {des}.
      </p>
      </div>
     
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => console.log("Redirect or reset search")}
        className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition-all"
      >
       <Link to={'/menu'}>Back to Menu</Link> 
      </motion.button>
    </motion.div>
  );
};

export default NoResults;
