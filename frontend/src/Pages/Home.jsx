import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Chef from "../components/Chef";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import GMap from "../components/GMap";
import Footer from "../components/Footer";
import Work from "../components/Work";
import Beforefooter from "../components/Beforefooter";
import FoodMenuSwiper from "../components/FoodMenuSlider";
import FoodMenu from "../components/FoodMenu";
const Home = () => {
  return (
    <>
      <Welcome />
      <Work />
      <FoodMenuSwiper />
      {/* <FoodMenu /> */}
      <FoodMenuSwiper param={'dairy'} />
      <Chef />
      <TestimonialsCarousel />
      <GMap />
      <Beforefooter />
      <Footer />
    </>
  );
};

export default Home;
