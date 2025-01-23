import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { useEffect, useState } from "react"; 


import apiClient from '../../services/apiClient'; 
import { toast, ToastContainer } from "react-toastify";

export default function RatingReviewModal({
  showModal,
  hoveredStar,
  setHoveredStar,
  setRating,
  setReview,
  setShowModal,
  review,
  rating,
  menuId 
}) {
  const [loading, setLoading] = useState(false); 
  const [isAdded, setIsAdded] = useState(true);
  const [reviewId,setReviewId]=useState('');

  useEffect(() => { 
    if (menuId) {
      const fetchReview = async () => {
        try {
          const response = await apiClient.get(`/menu/getreview/${menuId}`);
          console.log(response.data);
          if (response.status === 200) {
            console.log(response.data);
            
            if(response.data.rating){
             setIsAdded(false);
            }
            setReviewId(response.data._id);
            setReview(response.data.review);
            setRating(response.data.rating);
          } else {
            console.error('Failed to fetch review or rating');
          }
        } catch (error) {
          console.error('Error fetching review or rating', error);
        }
      };
      fetchReview();
    }
  },[menuId])

  const handelRatingReview = async () => {
    if (rating && review) {
      setLoading(true);
      try {
      
        const response = 
         isAdded? await apiClient.post(`/menu/addreview/${menuId}`, { review, rating })
        // console.log(menuId)
        : await apiClient.put(`/menu/updatereview/${reviewId}`, { review, rating })
      
        
        if (response.status === 200) {
          setShowModal(false); 
          const msg= isAdded?"Review added successfully" : "Review updated successfully"
           toast.success(msg,
             {
               position: "top-right",
               autoClose: 2000,
             }
           );
        } else {
          console.error('Failed to submit review or rating');
        }
        console.log(response.data);
        
      } catch (error) {
        console.error('Error submitting review or rating', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn('Rating and review are required');
    }
  };

  return (
    <>
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white p-6 rounded-lg w-full max-w-md relative"
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-xl font-semibold mb-4">Rate & Review</h3>
            
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="mr-1"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredStar || rating)
                        ? 'fill-yellow-500 stroke-orange-500'
                        : 'stroke-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here... (optional)"
              className="w-full p-3 border rounded-lg mb-4 h-32 resize-none focus:outline-yellow-500"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
              onClick={handelRatingReview}
              disabled={loading}  
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
      <ToastContainer /> </>
  );
}
