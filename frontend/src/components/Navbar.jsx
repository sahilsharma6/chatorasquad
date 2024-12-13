import React, { useState } from "react";
import { motion } from "framer-motion";

import { BsFillCircleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FaBowlFood } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
   
        <div className="flex  items-center space-x-2">
        <FaBowlFood className="text-3xl text-orange-500" />
          <span className="text-xl font-semibold text-gray-800">restaurant</span>
        </div>

   
        <nav
          className={`fixed top-0 right-0 h-full w-3/4 bg-white md:w-auto md:static md:flex md:space-x-8 items-center transition-transform duration-300 z-50 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          
          <button
            className="absolute top-4 right-10 text-gray-700 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <HiOutlineX className="text-2xl" />
          </button>

          <ul className="flex flex-col items-center mt-16 space-y-6 md:mt-0 md:space-y-0 md:flex-row md:space-x-8">
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(true)}
        >
          <HiOutlineMenuAlt3 className="text-2xl" />
        </button>

        {/* Order Button */}
        <motion.a
          href="#book"
          className="hidden md:inline-block bg-orange-500 text-white px-5 py-2 rounded-tl-lg rounded-br-lg shadow-md hover:bg-orange-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Order
        </motion.a>
      </div>
    </header>
  );
};

export default Navbar;
