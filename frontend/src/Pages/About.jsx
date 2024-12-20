import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="max-w-full mx-auto px-16 py-4 md:py-24">
      <motion.div 
        className="grid md:grid-cols-2 gap-8 items-center"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {/* Left Content */}
        <motion.div variants={fadeIn} className="space-y-6">
          <motion.h2 
            className="text-yellow-500 font-medium text-2xl tracking-wide text-center"
            variants={fadeIn}
          >
          _____ ABOUT US
          </motion.h2>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold leading-tight"
            variants={fadeIn}
          >
            We Leave A Delicious Memory For You
          </motion.h2>
          
          <motion.p 
            className="text-gray-600"
            variants={fadeIn}
          >Welcome to ChatoraSquad!

          At  ChatoraSquad, we believe dining is more than just food – it’s an experience. Nestled in the heart of Noida, our restaurant blends a warm, inviting atmosphere with culinary excellence, offering an unforgettable journey for your taste buds.
            is one of the best restaurant 
          </motion.p>
          
          <motion.p 
            className="text-gray-600"
            variants={fadeIn}
          >
            Our chefs are passionate about creating dishes that celebrate the finest ingredients, locally sourced and seasonally inspired. From classic favorites to unique creations, every plate is crafted with love, precision, and an unwavering commitment to quality.

Whether you’re joining us for a cozy family dinner, a special celebration, or a quick bite with friends, our team is dedicated to making your time with us truly memorable.

Thank you for choosing ChatoraSquad . We can’t wait to serve you and share our love for great food and exceptional hospitality.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-3 gap-4"
            variants={fadeIn}
          >
            {/* Food Images */}
            {[
              'https://thumbs.dreamstime.com/z/traditional-italian-food-margherita-pizza-italian-food-margherita-pizza-delicious-pizza-mozzarella-cheese-tomatoes-basil-117236353.jpg?w=99',
              'https://media.istockphoto.com/id/1058029096/photo/chicken-biryani.webp?s=1024x1024&w=is&k=20&c=WsbuHWOyKZJ0q09ZI-gZbUZYVTF1LE2aeo3RK2UierU=',
              'https://media.gettyimages.com/id/1446965529/photo/homemade-burger-and-chips.webp?s=1024x1024&w=gi&k=20&c=gjGxzhjYNT5JwQM-x6gq1f835qc_KKOUACqnAUfa0yU='
            ].map((src, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={src}
                  alt={`Food item ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          className="relative"
          variants={fadeIn}
        >
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <video
              src="https://cdn.pixabay.com/video/2017/03/22/8466-209563051_large.mp4"
              controls
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
            > </video>
            
          </div>
          
          <motion.div 
            className="absolute -top-4 -bottom-4 -left-4 -right-4 bg-teal-100 -z-10 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;