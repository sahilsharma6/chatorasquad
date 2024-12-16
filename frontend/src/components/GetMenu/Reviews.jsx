import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const RatingBar = ({ rating, count, total }) => {
  const percentage = (count / total) * 100;

  return (
    <div className="flex items-center gap-2">
      <div className="w-12 text-sm text-gray-600">{rating}★</div>
      <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-green-500"
        />
      </div>
      <div className="w-12 text-sm text-gray-600">{count}</div>
    </div>
  );
};

const RatingsAndReviews = ({ product }) => {
  const ratings = [
    { stars: 5, count: 1884 },
    { stars: 4, count: 547 },
    { stars: 3, count: 283 },
    { stars: 2, count: 150 },
    { stars: 1, count: 311 },
  ];
  const totalRatings = ratings.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-6 rounded-md shadow-md py-3 px-3 bg-orange-50"
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-medium">Ratings & Reviews</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 border-orange-500"
        >
          Rate The Dish
        </motion.button>
      </div>

      <div className="flex items-start gap-12 flex-wrap">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-medium">{product.rating || 4.1}</span>
            <Star className="w-8 h-8 fill-current" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {totalRatings.toLocaleString()} Ratings &<br />
            {product.reviews.length} Reviews
          </p>
        </div>

        {/* Rating Bars */}
        <div className="flex-grow space-y-3">
          {ratings.map((rating) => (
            <RatingBar
              key={rating.stars}
              rating={rating.stars}
              count={rating.count}
              total={Math.max(...ratings.map((r) => r.count))}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Reviews = ({ product }) => {
  const getRatingColor=(rate)=>{
    if(rate==2){
      return 'bg-yellow-500'
    }
    else if(rate==1) return 'bg-red-500'
    return 'bg-green-500'
  }
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50 px-0">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column: Ratings and Reviews Summary */}
        <div className="flex-grow md:w-2/5 ">
          <RatingsAndReviews product={product} />
        </div>

        {/* Right Column: Individual Reviews */}
        <div className="flex-grow md:w-3/5 flex flex-col gap-4 border rounded-lg px-3 py-3 bg-orange-50">
          {product.reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white shadow-md p-4 rounded"
            >
              <div className="flex gap-2 items-center mb-2">
                <div className={` ${getRatingColor(review.rating)} text-white px-2 rounded flex items-center gap-1`}>
                  {review.rating} <Star className="fill-white w-4 h-4" />
                </div>
                <h2 className="text-lg font-medium">{review.title}</h2>
              </div>
              <p className="text-gray-600 mb-2">{review.description}</p>
              <p className="text-gray-400 text-sm">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Reviews;
