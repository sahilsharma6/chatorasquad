import React from "react";
import chefImg from "../assets/chef.png";
import { Link } from "react-router-dom";
function Chef() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white py-12 px-6 md:px-16 lg:px-24  pt-20">
      <div className="relative w-full md:w-3/4 px-4 md:px-8 lg:px-28">
        <h2 className="text-4xl  font-bold text-gray-800 text-center p-4 md:p-8">
          Our Expert Chef
        </h2>
        <p className="text-gray-600 text-base sm:text-lg  ">
          Our expert chef brings years of culinary expertise and a passion for
          flavor to every dish. With a deep knowledge of diverse cuisines, they
          craft each meal with the finest ingredients and innovative techniques.
          Their dedication to perfection ensures that every bite is a delightful
          experience, blending tradition with creativity. Whether you’re
          enjoying a comforting classic or an adventurous new dish, our chef’s
          artistry is what makes every meal unforgettable
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 pt-6">
          <div className="flex   space-x-3 p-2 ">
            <div className="w-5 h-5 p-2 bg-orange-500 mt-2 rounded-full flex items-center justify-center text-white">
              ✓
            </div>
            <span className="text-sm sm:text-base">
              <b> Attention to Detail:</b> Carefully designs each dish, ensuring
              the perfect balance of flavors and presentation every time.
            </span>
          </div>
          <div className="flex  space-x-3 p-2 ">
            <div className="w-5 h-5 p-2 bg-orange-500 mt-2 rounded-full flex items-center justify-center text-white">
              ✓
            </div>
            <span className="text-sm sm:text-base">
              <b> Culinary Mastery:</b> Years of experience in creating
              flavorful and innovative dishes from a variety of cuisines.
            </span>
          </div>
          <div className="flex  space-x-3 p-2 ">
            <div className="w-5 h-5 p-2 bg-orange-500 mt-2 rounded-full flex items-center justify-center text-white">
              ✓
            </div>
            <span className="text-sm sm:text-base">
              <b>Creative Flair:</b> Blends traditional recipes with modern
              techniques, offering a unique and best dining experience.
            </span>
          </div>
          <div className="flex  space-x-3 p-2 ">
            <div className="w-5 h-5 p-2 bg-orange-500 mt-2 rounded-full flex items-center justify-center text-white">
              ✓
            </div>
            <span className="text-sm sm:text-base">
              <b> Passionate About Quality:</b> Uses only the finest, fresh
              ingredients to craft each meal to perfection.
            </span>
          </div>
        </div>

        <div className="flex space-x-4 pt-6 justify-center items-center ">
          <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition-all">
            <Link to={"/menu"}>Menu</Link>
          </button>
        </div>
      </div>

      <div className="relative w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
        <img
          src={chefImg}
          alt="Chef"
          className="w-72 h-auto md:w-96 rounded-full"
        />
      </div>
    </div>
  );
}

export default Chef;
