import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Chef from "../components/Chef";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import GMap from "../components/GMap";
import Footer from "../components/Footer";
import Work from "../components/Work";
const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />
      <Welcome />
      <Work />
      <Chef />
      <TestimonialsCarousel />
      <GMap />

      <Footer />
    </>
  );
};

export default Home;
