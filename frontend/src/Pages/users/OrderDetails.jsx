import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/apiClient'; 
import RatingReviewModal from '../../components/users/RatingReviewModal';
import ViewOrder from '../../components/users/ViewOrder';

const OrderDetails = () => {
  const { id } = useParams(); 
  const [orderData, setOrderData] = useState(null);
  const [shippingData, setShippingData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState('');
  const [itemId,setItemId]=useState('');
  const [getReview,setGetReview]=useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await apiClient.get(`/user/orderdetails/${id}`);
        const data = response.data.order;
        console.log(response.data);
        

        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setOrderData(data); 
        } else {
          console.error("Items array is empty or undefined.");
        }

        setShippingData(data.deliveryAddress || {});
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!orderData || !shippingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-full mx-auto p-4 md:p-6">
      <ViewOrder
        orderData={orderData}  
        shippingData={shippingData}  
        setShowModal={setShowModal}
        review={review}
        setItemId={setItemId}
        itemId={itemId}
      />

      {/* Rating Modal */}
      <RatingReviewModal
        review={review}
        setHoveredStar={setHoveredStar}
        hoveredStar={hoveredStar}
        setRating={setRating}
        setReview={setReview}
        setShowModal={setShowModal}
        showModal={showModal}
        rating={rating}
        menuId={itemId}
      />
    </div>
  );
};

export default OrderDetails;
