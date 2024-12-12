import React from 'react';

function Chef() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white py-12 px-6 md:px-16 lg:px-24 md:pt-40 pt-20">
      <div className="relative w-full md:w-3/4 px-4 md:px-8 lg:px-28">
        <h2 className="text-4xl  font-bold text-gray-800 text-center p-4 md:p-8">
          Our Expert Chef
        </h2>
        <p className="text-gray-600 text-base sm:text-lg  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.nnfwnf
          fjrejgfienhgfoenbgoeng
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 pt-6">
         <div  className="flex items-center space-x-3 p-2 " >
                <div className="w-5 h-5 p-2 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-sm sm:text-base">
                  Lorem ipsum dolor sit amet, consectetur
                </span>
         </div>
         <div  className="flex items-center space-x-3 p-2 " >
                <div className="w-5 h-5 p-2 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-sm sm:text-base">
                  Lorem ipsum dolor sit amet, consectetur
                </span>
         </div>
         <div  className="flex items-center space-x-3 p-2 " >
                <div className="w-5 h-5 p-2 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-sm sm:text-base">
                  Lorem ipsum dolor sit amet, consectetur
                </span>
         </div>
         <div  className="flex items-center space-x-3 p-2 " >
                <div className="w-5 h-5 p-2 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-sm sm:text-base">
                  Lorem ipsum dolor sit amet, consectetur
                </span>
         </div>

        </div>

       
        <div className="flex space-x-4 pt-6 justify-center items-center ">
          <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition-all">
            Menu
          </button>
        </div>
      </div>

     
      <div className="relative w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
          <img  src="../src/assets/chef.png"   alt="Chef"   className="w-72 h-auto md:w-96 rounded-full"  />
        </div>
      
    </div>
  );
}

export default Chef;
