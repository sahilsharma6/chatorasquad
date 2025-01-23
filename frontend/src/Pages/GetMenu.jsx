import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Reviews from '../components/GetMenu/Reviews';
import Thumbnails from '../components/GetMenu/Thumbnails';
import GetMenuDetails from '../components/GetMenu/GetMenuDetails';
import Loader from '../components/Loader';
import apiClient from '../services/apiClient';
import  ReviewList  from '../components/GetMenu/Reviews';


const GetMenu = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState();
  const [isWishlist, setIsWishlist] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/menu/getdetails/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(`/menu/reviews/${id}`);
        console.log(response);

        setReviews(response.data);
      } catch (error) {
        setReviews([]);
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>No product data available</div>;
  }


  const { name, images, description, price, reviews,title } = product;
      document.title = title || name; 
 
  return (
    <div className="max-w-full mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Left Column - Images */}
        <Thumbnails
          images={images}
          selectedImage={selectedImage}
          setIsWishlist={setIsWishlist}
          setIsZoomed={setIsZoomed}
          isZoomed={isZoomed}
          isWishlist={isWishlist}
          setSelectedImage={setSelectedImage}
        />


        <GetMenuDetails
          dishDetails={product} // 
          Reviews={Reviews}
        />
      </div>


      <ReviewList product={Reviews} />
    </div>
  );
};

export default GetMenu;
