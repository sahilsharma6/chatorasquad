import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Chef from "../components/Chef";
const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <Hero />
        <Welcome />
        <Chef />
        - Other Sections
      </div>
    </>
  );
};

export default Home;
