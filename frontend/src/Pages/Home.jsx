import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import GMap from "../components/GMap";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <Hero />
       <TestimonialsCarousel />
       <GMap />
      </div>
      <Footer / >
    </>
  );
};

export default Home;
