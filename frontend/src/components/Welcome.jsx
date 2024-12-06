import React from "react";

function Welcome() {
  return (
    <div className="flex z-0 flex-col md:flex-row items-center justify-center p-8 bg-white  md:mx-[10%]  md:pt-40 pt-20">
      <div className="relative w-full  md:w-1/2 h-auto md:h-[400px] lg:h-[450px] flex items-center justify-center">
        <img  src="../src/assets/Union.png" alt="Dish" className="w-4/5 md:w-4/5 lg:w-3/4 h-auto border-none "
        />
        <img src="../src/assets/leaf-3.png" alt="Leaf"   className="absolute top-0 left-8 w-16 md:w-20 lg:w-24 animate-float"
        />
        <img  src="../src/assets/leaf-1.png"  alt="Leaf" className="absolute bottom-4 right-12 w-12 md:w-16 lg:w-20 animate-float-reverse"
        />
        <img src="../src/assets/leaf-2.png"  alt="Leaf"  className="absolute top-16 right-6 w-14 md:w-18 lg:w-22 animate-float"
        />
      </div>

      <div className="relative w-full md:w-1/2 h-auto md:h-[400px] lg:h-[500px] flex flex-col justify-center items-start space-y-6 p-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          Welcome to Our Restaurant
        </h2>
        <p className="text-gray-600 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700">
            Menu
          </button>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-md shadow hover:bg-orange-400">
            Book a Table
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
