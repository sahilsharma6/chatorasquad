import React from "react";

function Welcome() {
  return (
    <div className="bg-orange-500 w-auto h-auto flex flex-wrap lg:flex-nowrap p-6 items-center justify-center text-white">
  <div className="flex flex-col items-center justify-center space-y-4 p-8 w-auto">
    <h1 className="text-5xl md:text-8xl font-bold mb-4 text-center w-auto">Are you starving?</h1>
    <p className=" text-2xl md:text-4xl text-gray-700 text-center p-4 w-auto">
      Within a few clicks, find meals that are accessible near you
    </p>
    <div className="bg-white justify-center space-x-4 w-auto  p-4 rounded-md h-auto">
      <div className="flex justify-center space-x-4 w-auto md:w-64">
        <img src="./src/assets/bike.png" alt="location" className="w-auto h-auto pt-3 pb-3" />
        <button className="bg-white text-gray-700 py-2  rounded-md">Delivery</button>
      </div>
      <hr className="w-auto" />
      <div className="mt-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Enter Your Zip Code"
          className="p-2 rounded-md w-auto md:w-64 border focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button className="bg-orange-600 text-white py-2 px-4 rounded-md m-2">Check</button>
      </div>
    </div>
  </div>
  <div className="h-auto w-auto  p-4 hover:scale-105 transform transition duration-500 ease-in-out">
    <img
      src="./src/assets/bowl.png"
      alt="food"
      className=" w-auto h-auto md:w-96 mg:h-96 lg:h-auto lg:w-auto"
    />
  </div>
</div>

  );
}

export default Welcome;
