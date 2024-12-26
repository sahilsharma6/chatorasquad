const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    return (
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, index) => {
          if (index < filledStars) {
            return <span key={index} className="text-yellow-500">★</span>; // Filled star
          } else if (index === filledStars && hasHalfStar) {
            return <span key={index} className="text-yellow-500">☆</span>; // Half star (optional)
          } else {
            return <span key={index} className="text-gray-300">☆</span>; // Empty star
          }
        })}
      </div>
    );
  };
  export default StarRating