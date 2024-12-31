import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ReviewCard = ({ review, animate = true }) => {
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };
  
    return (
      <motion.div
        initial={animate ? "hidden" : "visible"}
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-4 mb-4 w-96 flex-grow"
      >
        <div className="flex items-start gap-4 flex-wrap h-auto">
          <img src={review.img} alt="Food" className="w-20 h-20 rounded-lg object-cover" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{review.dish}</h3>
            <p className="text-sm text-gray-600">{review.restaurant}</p>
            <p className="mt-2 text-gray-700">{review.review}</p>
          </div>
        </div>
        
        <div className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={review.reviewer.img} alt={review.reviewer.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{review.reviewer.name}</p>
                <p className="text-sm opacity-80">{review.reviewer.role}</p>
                <p className="text-xs opacity-60">{review.reviewer.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{review.reviewer.rating}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  export default ReviewCard