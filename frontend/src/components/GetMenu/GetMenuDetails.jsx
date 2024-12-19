
import { motion } from 'framer-motion';
import { ChevronDown, Share, Heart, MapPin, Info, ShieldCheck, Gem } from 'lucide-react';
export default function GetMenuDetails({price,bankOffers,highlights,description,specifications,name}){
    return (
        <div className="md:w-1/2 shadow-lg  py-6 px-6 bg-gray-100 rounded">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">{name}</h1>
            <Share className="w-6 h-6 text-gray-500 cursor-pointer" />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="bg-green-500 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
              4.1 ★
            </div>
            <span className="text-gray-500">3,175 Ratings & 266 Reviews</span>
            <ShieldCheck size={30} className='text-green-500'/>
          </div>

          <div className="mt-6">
            <span className="text-green-600 text-sm font-medium">Special price</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-medium">₹{price.special}</span>
              <span className="text-gray-500 line-through">₹{price.original}</span>
              <span className="text-green-600 font-medium">{Math.round(((price.original - price.special) / price.original) * 100)}% off</span>
            </div>
          </div>

          {/* Bank Offers */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">Available offers</h3>
            <div className="space-y-3">
              {bankOffers.map((offer, index) => (
                <div key={index} className ="flex items-start gap-2">
                  <Gem size={33} className='text-green-500' />
                  <div>
                    <span className="font-medium">{offer.title}</span>
                    <span className="text-gray-700"> {offer.description}</span>
                    <span className="text-blue-600 ml-1 cursor-pointer">{offer.tnc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Section */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">Delivery</h3>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Delivery Pincode"
                className="border-none outline-none"
              />
              <button className="text-blue-600 font-medium">Check</button>
            </div>
            <div className="mt-2">
              <span className="font-medium">Delivery by 19 Dec, Thursday </span>
              <span className="text-green-600">| Free ₹40</span>
              <p className="text-gray-500 text-sm">if ordered before 2:59 PM</p>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-start">
              <div className="w-1/4">
                <h3 className="text-gray-500">Highlights</h3>
              </div>
              <div className="w-3/4">
                <ul className="space-y-2">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-start">
              <div className="w-1/4">
                <h3 className="text-gray-500">Description</h3>
              </div>
              <div className="w-3/4">
                <p>{description}</p>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t pt-4"
          >
            <h2 className="text-xl font-medium mb-4">Specifications</h2>
            <div className="b p-4 rounded-lg">
              <h3 className="font-medium mb-3">General</h3>
              <div className="space-y-3">
                {specifications.general.map((spec, index) => (
                  <div key={index} className="flex py-2 border-b last:border-b-0">
                    <div className="w-1/3 text-gray-500">{spec.label}</div>
                    <div className="w-2/3">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Services Section */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-start">
              <div className="w-1/4">
                <h3 className="text-gray-500">Services</h3>
              </div>
              <div className="w-3/4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Cash on Delivery available</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}