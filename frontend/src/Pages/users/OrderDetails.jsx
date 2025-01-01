import React, { useState } from 'react';
import RatingReviewModal from '../../components/users/RatingReviewModal';
import ViewOrder from '../../components/users/ViewOrder';

const OrderDetails = ({   }) => {
  const orderData = {
    productName: "Margherita Pizza",
    productType: "Non Veg",
    img: "https://thumbs.dreamstime.com/z/traditional-italian-food-margherita-pizza-italian-food-margherita-pizza-delicious-pizza-mozzarella-cheese-tomatoes-basil-117236353.jpg?w=992",
    listPrice: 939,
    sellingPrice: 879,
    extraDiscount: 25,
    specialPrice: 193,
    handlingFee: 4,
    finalAmount: 932,
    orderStatus: [
      {status:"Order Confirmed",date:'2024-12-10' ,time:'08:00pm'},
      {status:"Delivered",date:'2024-12-10' ,time:'12:00pm'}
    ]
  };
  
  const shippingData = {
    name: "Rudra",
    institution: "abc xyz Institute",
    area: "Barunanpukhria",
    locality: "Kokapur",
    region: "West Bengal",
    phone: "70297259487"
  };
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState('');


  return (
    <div className="max-w-full mx-auto p-4 md:p-6">
    <ViewOrder orderData={orderData} shippingData={shippingData} setShowModal={setShowModal} review={review}  />

      {/* Rating Modal */}
     <RatingReviewModal review={review} setHoveredStar={setHoveredStar} hoveredStar={hoveredStar} setRating={setRating} setReview={setReview} setShowModal={setShowModal} showModal={showModal} rating={rating} />
    </div>
  );
};

export default OrderDetails;