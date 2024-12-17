import React from 'react';

function Work() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white  w-full h-auto p-20 md:p-10 pb-0 flex flex-col items-center">
      <h2 className="text-2xl md:text-4xl font-bold text-orange-500 mb-8 justify-center text-center">
        How does it work
      </h2>
      <div className="grid  md:flex items-centers justify-between  grid-cols-1   text-center w-auto h-auto  ">
      <div className="flex flex-col items-center p-6">
          <div className=" p-4 rounded-full w-20 h-20 flex items-center justify-center">
            <img src="./src/assets/menu.png" alt="Choose order" className="w-auto h-auto" />
          </div>
          <h3 className="text-xl font-semibold mt-4 ">Choose order</h3>
          <p className="text-lg text-gray-600 p-4">
            Check over hundreds of menus to pick your favorite food.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 ">
          <div className="p-4 rounded-full w-20 h-20 flex items-center justify-center">
            <img src="./src/assets/location.png" alt="Select location" className='w-auto h-auto' />
          </div>
          <h3 className="text-lg font-semibold mt-4 ">Select location</h3>
          <p className="text-lg text-gray-600 p-4">
            Choose the location where your food will be delivered.
          </p>
        </div>
        
        <div className="flex flex-col items-center p-6">
          <div className=" p-4 rounded-full w-20 h-20 flex items-center justify-center">
            <img src="./src/assets/payment.png" alt="Pay advanced" className="w-auto h-auto" />
          </div>
          <h3 className="text-lg font-semibold mt-4 ">Pay advanced</h3>
          <p className="text-sm text-gray-600 p-4">
            It's quick, safe, and simple. Select several methods of payment.
          </p>
        </div>
        <div className="flex flex-col items-center p-6">
          <div className="p-4 rounded-full w-20 h-20 flex items-center justify-center">
            <img src="./src/assets/enjoy.png" alt="Enjoy meals" className="w-auto h-auto " />
          </div>
          <h3 className="text-lg font-semibold mt-4 ">Enjoy meals</h3>
          <p className="text-sm text-gray-600 p-4">
            Food is made and delivered directly to your home.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Work;
