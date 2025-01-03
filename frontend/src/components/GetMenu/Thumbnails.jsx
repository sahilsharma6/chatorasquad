import { motion } from 'framer-motion';
import { ChevronDown, Share, Heart, MapPin, Info, ShieldCheck, Gem } from 'lucide-react';
export default function Thumbnails ({images,selectedImage,setIsWishlist,setIsZoomed,isWishlist,isZoomed,setSelectedImage}){
    return (
        <div className="md:w-1/2 shadow-lg px-3 bg-gray-100 sticky">
          <div className="flex md:flex-row flex-col-reverse gap-2 ">
            {/* Thumbnails */}
            <div className="md:w-1/5 w-full md:flex-col flex flex-row gap-2 ">
              {images.map((thumb, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`w-16 h-16 border-2 cursor-pointer ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-4/5 w-full relative flex-grow">
              <motion.div
                className="overflow-hidden rounded-lg relative"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <motion.img
                  src={images[selectedImage]}
                  alt="Product"
                  className="w-full h-96 object-cover transition-transform duration-300"
                  animate={{ scale: isZoomed ? 1.8 : 1 }}
                />
              </motion.div>

              <motion.button
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlist(!isWishlist)}
              >
                <Heart
                  className={`w-6 h-6 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                />
              </motion.button>
            </div>
          </div>

      
        </div>
    )
}