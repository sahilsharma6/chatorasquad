import React, { useState, useEffect } from 'react';
import Reviews from '../components/GetMenu/Reviews';
import getMenuData from '../Data/getMenuData.json'
import Thumbnails from '../components/GetMenu/Thumbnails';
import GetMenuDetails from '../components/GetMenu/GetMenuDetails';
import Loader from '../components/Loader';

const GetMenu = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlist, setIsWishlist] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [product, setProduct] = useState(getMenuData.product); 
    const [loading, setLoading] = useState(true); 

    //   setProduct(getMenuData)


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300); 

    return () => clearTimeout(timer);
  }, []);
  if(loading) {
    return <Loader />
  }

    const { name, images, highlights, specifications, bankOffers, description, price,reviews } = product;
    // console.log(product);


    return (
        <div className="max-w-full mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-3">
                {/* Left Column - Images */}
                <Thumbnails images={images}
                    selectedImage={selectedImage}
                    setIsWishlist={setIsWishlist}
                    setIsZoomed={setIsZoomed}
                    isZoomed={isZoomed}
                    isWishlist={isWishlist}
                    setSelectedImage={setSelectedImage} />

                {/* Right Column - Product Details */}
                <GetMenuDetails
                    bankOffers={bankOffers}
                    price={price}
                    highlights={highlights}
                    description={description}
                    specifications={specifications}
                    name={name}
                />
            </div>
            {/* Ratings Reviews  */}
            <Reviews product={product} />
        </div>
    );
};

export default GetMenu;