import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Mail, Instagram } from 'lucide-react';

const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const socialIcons = [
    { Icon: Twitter, href: '#', delay: 0.3 },
    { Icon: Facebook, href: '#', delay: 0.4 },
    { Icon: Mail, href: '#', delay: 0.5 },
    { Icon: Instagram, href: '#', delay: 0.6 }
  ];

  return (
    <>
      <h1 className='bg-gray-100 text-center text-3xl font-bold mt-6'>Contact Us</h1>
      <div className="min-h-screen px-16 bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-full bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden ">
          {/* Form Section */}
          <motion.div 
            className="w-full md:w-3/5 p-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <form className="space-y-6">
              <motion.div variants={fadeIn} transition={{ delay: 0.1 }}>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-500"
                />
              </motion.div>

              <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-500"
                />
              </motion.div>

              <motion.div variants={fadeIn} transition={{ delay: 0.3 }}>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-500"
                />
              </motion.div>

              <motion.div variants={fadeIn} transition={{ delay: 0.4 }}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-500"
                />
              </motion.div>

              <motion.div variants={fadeIn} transition={{ delay: 0.5 }}>
                <textarea
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-500"
                />
              </motion.div>

              <motion.div variants={fadeIn} transition={{ delay: 0.6 }}>
                <label className="block text-gray-600 mb-2">Have you tasted our dishes?</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-500">
                  <option>Yes</option>
                  <option>No</option>
                  <option>I want to try</option>
                </select>
              </motion.div>

              <motion.div variants={fadeIn} transition={{ delay: 0.7 }} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-yellow-500 bg-white checked:text-white transition-all" />
                <span className="text-gray-500 text-sm">Accept Terms and Conditions.</span>
              </motion.div>

              <motion.button
                variants={fadeIn}
                transition={{ delay: 0.8 }}
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Submit
              </motion.button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            className="w-full md:w-2/5 bg-gray-50 p-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              Feel free to reach out to us for any queries or feedback. We are here to help!
            </p>

            <p className="text-gray-800 font-semibold">Email: support@ChatoraSquad.com</p>
            <p className="text-gray-800 font-semibold mb-8">Phone: +123-456-7890</p>

            <div className="flex gap-6">
              {socialIcons.map(({ Icon, href, delay }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay }}
                  className="text-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
