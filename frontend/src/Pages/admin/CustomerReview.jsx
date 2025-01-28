import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReviewCard from '../../components/admin/Customer/ReviewCard';
import ReviewFilters from '../../components/admin/Customer/ReviewFilters';
import RatingChart from '../../components/admin/Customer/RatingChart';
import apiClient from '../../services/apiClient';
import { Pagination } from '../../components/Pagination';

const reviews = [
  {
    id: 1,
    dish: "Tuna soup spinach with himalaya salt",
    restaurant: "JUICE",
    review: "A very fine addition to the not over plentiful supply of good restaurants in this part of west London.",
    img:"https://www.familyfoodonthetable.com/wp-content/uploads/2023/04/Tuna-spinach-salad-1200-3.jpg",
    reviewer: {
      name: "Steve Henry",
      role: "Buyer",
      department: "Best Customer",
      rating: 3.5,
      img:"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    date: "2024-11-20",
  },
  {
    id: 2,
    dish: "Meidum Spicy Spagetti italiano",
    restaurant: "BURGER",
    review: "A very fine addition to the not over plentiful supply of good restaurants in this part of west London.",
    img:"https://www.shutterstock.com/shutterstock/photos/2309584835/display_1500/stock-photo-spicy-thai-basil-pork-pasta-on-white-dish-with-white-background-italian-food-fusion-thai-food-2309584835.jpg",
    reviewer: {
      name: "Willy Wonca",
      role: "Buyer",
      department: "Regular",
      rating: 4.2,
      img:"https://images.pexels.com/photos/18809868/pexels-photo-18809868/free-photo-of-brunette-young-man-in-tshirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    date: "2025-01-21",
    },
];

const convertReviews = (data) => {
  return data.map((review, index) => ({
      id: index + 1, // Assuming you want a sequential ID starting from 1
      dish: review.menuId ? review.menuId.name : "Unknown Dish", // Use menuId name or a default value
      restaurant: review.menuId ? review.menuId.type : "Unknown Restaurant", // Use menuId type or a default value
      review: review.review.trim(), // Trim whitespace from the review text
      img: review.menuId && review.menuId.images.length > 0 ? review.menuId.images[0] : "default_image_url.jpg", // Use the first image or a default image
      reviewer: {
          name: `${review.userId.firstName} ${review.userId.lastName}`, // Combine first and last name
          role: "Buyer", // Assuming a static role, you can modify this as needed
          department: "Regular", // Assuming a static department, you can modify this as needed
          rating: review.rating, // Use the rating from the review
          img: "default_reviewer_image_url.jpg" // Use a default image for the reviewer
      },
      date: new Date(review.createdAt).toISOString().split('T')[0] // Format the date to YYYY-MM-DD
  }));
};

const CustomerReview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filter, setFilter] = useState('recent'); 
  const [reviewData,setReviewData]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPages,setTotalPages]=useState(1)
const limit=2
  useEffect(()=>{
    try {
     async function fetchReviews(){

       const res=await apiClient.get('/admin/allreview?search='+searchTerm+'&startDate='+startDate+'&endDate='+endDate+'&sort='+filter+'&limit='+limit+'&page='+currentPage)
       console.log(res.data);
      const reviewsData= convertReviews(res.data.data)
      console.log(reviewsData);
      
      setReviewData(reviewsData)
       setCurrentPage(res.data.page)
       setTotalPages(res.data.totalPages)

     }

     fetchReviews()
    } catch (error) {
      
    }
  },[searchTerm,filter,startDate,endDate,currentPage])

  const filteredReviews = reviewData
    // .filter(review => 
    //   review.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   review.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase())
    // )
    // .filter(review => 
    //   (!startDate || review.date >= startDate) &&
    //   (!endDate || review.date <= endDate)
    // )
    // .sort((a, b) => {
    //   if (filter === 'recent') {
    //     return new Date(b.date) - new Date(a.date);
    //   } else if (filter === 'positive') {
    //     return b.reviewer.rating - a.reviewer.rating;
    //   } else {
    //     return a.reviewer.rating - b.reviewer.rating;
    //   }
    // });

  return (
    <div className="max-w-full mx-auto p-6">
        <h1 className='text-4xl font-bold mt-6 mb-8'>Customers Reviews</h1>
      <ReviewFilters searchTerm={searchTerm} setEndDate={setEndDate} setFilter={setFilter} setSearchTerm={setSearchTerm} setStartDate={setStartDate} startDate={startDate} endDate={endDate}  filter={filter} />

      {/* Review Cards */}
      <motion.div layout className="space flex flex-wrap gap-6 justify-center">
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </motion.div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <RatingChart reviews={reviewData} />
    </div>
  );
};

export default CustomerReview;