import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";

const SignupLoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isLogin) {
      // Signup validations
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else {
      // Login validations
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        console.log("Login submitted", { email: formData.email });
      } else {
        console.log("Signup submitted", {
          fullName: formData.fullName,
          email: formData.email,
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
  };

  return (
    <div
      className="w-full bg-cover bg-center flex items-center justify-center  text-center p-8"
      style={{
        backgroundImage: "url('./src/assets/signup.png')",
      }}
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl h-[40vh] md:h-[50vh]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className=" w-full md:w-1/2 p-8 flex flex-col justify-center "
          >
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-700">
              {isLogin ? "Please login to your account" : "Create your account"}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <div className="flex items-center border-b-2 border-orange-300 py-2">
                    <User className="text-orange-500 mr-3" />
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none text-gray-700"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              )}
              <div className="mb-4">
                <div className="flex items-center border-b-2 border-orange-300 py-2">
                  <Mail className="text-orange-500 mr-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-center border-b-2 border-orange-300 py-2">
                  <Lock className="text-orange-500 mr-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-orange-500" />
                    ) : (
                      <Eye className="text-orange-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              {!isLogin && (
                <div className="mb-4">
                  <div className="flex items-center border-b-2 border-orange-300 py-2">
                    <Lock className="text-orange-500 mr-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none text-gray-700"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-500 cursor-pointer hover:underline"
              >
                {isLogin ? "Create New" : "Login"}
              </span>
            </p>
          </motion.div>

          <div
            className="w-1/2 bg-cover bg-center  items-center justify-center text-white text-center p-2 hidden md:flex"
            style={{
              backgroundImage: "url('png')",
            }}
          >
            <div className="w-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-90 h-full flex items-center justify-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  We are more than just a company
                </h2>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLoginForm;
