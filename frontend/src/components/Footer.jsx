import React from 'react';
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="mx-6 px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-[40%,20%,20%,20%] lg:grid-cols-[40%,20%,20%,20%] gap-6">
        {/* Logo and Description */}
        <div className="flex flex-col col-span-1 gap-4">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-8 h-8 bg-orange-500 rounded-full"></div> */}
              <span className="text-xl font-semibold">restaurant</span>
            </div>
            <p className="text-gray-600 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
            <a href="#" className="text-blue-600 hover:underline">Learn more</a>
          </div>

          {/* Opening Hours */}
          <div className="col-span-1 mt-3">
            <h3 className="font-semibold mb-4 uppercase text-sm">Opening Hours</h3>
            <div className="space-y-2 flex gap-6 flex-wrap">
              <div className="flex justify-between flex-col">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="text-gray-600">8:00 am to 9:00 pm</span>
              </div>
              <div className="flex justify-between flex-col">
                <span className="text-gray-600">Saturday</span>
                <span className="text-gray-600">8:00 am to 9:00 pm</span>
              </div>
              <div className="flex justify-between flex-col">
                <span className="text-gray-600">Sunday</span>
                <span className="text-gray-600">CLOSED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="col-span-1">
          <h3 className="font-semibold mb-4">NAVIGATION</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Menu</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">About us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Main dishes</a></li>
          </ul>
        </div>

        {/* Dishes */}
        <div className="col-span-1">
          <h3 className="font-semibold mb-4">DISHES</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Fish & Veggies</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Tofu Chili</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Egg & Cucumber</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Lumpia w/Sauce</a></li>
          </ul>
        </div>

        {/* Follow Us with Framer Motion */}
        <div className="col-span-1">
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <motion.a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }} 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CiFacebook size={32} className='hover:bg-orange-500 hover:rounded-full hover:text-white'/>
            </motion.a>
            <motion.a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }} 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaInstagram size={32} className='hover:bg-orange-500 hover:rounded-full hover:text-white'/>
            </motion.a>
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }} 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RiTwitterLine size={32} className='hover:bg-orange-500 hover:rounded-full hover:text-white' />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col flex-wrap md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600 text-sm">
            © 2022 Restaurants. All Right Reserved. Designed by Isaac
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Legal Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
