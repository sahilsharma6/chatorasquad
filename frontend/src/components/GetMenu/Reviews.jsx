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
  // Assuming product.reviews is the array of review objects
  const reviews = product || [];
  
  // Calculate the total ratings and the count for each star rating
  const ratingsCount = [0, 0, 0, 0, 0]; // Index 0 for 1 star, index 1 for 2 stars, etc.
  
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingsCount[review.rating - 1] += 1; // Increment the count for the corresponding star rating
    }
  });

  const totalRatings = reviews.length;
  const overallRating = totalRatings > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings).toFixed(1) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-6 rounded-md shadow-md py-3 px-3 bg-gray-100"
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-medium">Ratings & Reviews</h2>
        {/* Uncomment if you want to allow users to rate the dish */}
        {/* <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 border-orange-500"
        >
          Rate The Dish
        </motion.button> */}
      </div>

      <div className="flex items-start gap-12 flex-wrap">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-medium">{overallRating}</span>
            <Star className="w-8 h-8 fill-current" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {totalRatings.toLocaleString()} Ratings &<br />
            {totalRatings} Reviews
          </p>
        </div>

        {/* Rating Bars */}
        <div className="flex-grow space-y-3">
          {ratingsCount.map((count, index) => (
            <RatingBar
              key={index + 1}
              rating={index + 1}
              count={count}
              total={totalRatings}
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
    <div className="max-w-full  mx-auto p-4 bg-gray-100  mt-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column: Ratings and Reviews Summary */}
        <div className="flex-grow md:w-2/5 ">
          <RatingsAndReviews product={product} />
        </div>

        {/* Right Column: Individual Reviews */}
        <div className="flex-grow md:w-3/5 flex flex-col gap-4 border rounded-lg px-3 py-3 bg-gray-50">
          {product.map((review, index) => (
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
                <h2 className="text-lg font-medium"> { review.review.substring(0,10)}</h2>
              </div>
              <p className="text-gray-600 mb-2">{review.review}</p>
              <p className="text-gray-400 text-sm">{ new Date(review.updatedAt).toLocaleString() }</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Reviews;
