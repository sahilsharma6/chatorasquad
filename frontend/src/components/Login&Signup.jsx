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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 w-auto h-auto">
      <img
    src="./src/assets/signup.png"
    alt="Background"
    className="absolute z-0 w-full h-full object-cover" 
  />
  <div className="relative z-10 bg-[#333333]  w-auto p-8 md:p-20 h-auto rounded-lg shadow-2xl justify-center items-center flex flex-col">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md"
      >
        {/* Toggle Buttons */}
        <div className="flex ">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-full p-4 font-bold transition-colors duration-300 ${
              isLogin
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-full p-4 font-bold transition-colors duration-300 ${
              !isLogin
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-8">
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
                    className="w-full bg-transparent focus:outline-none text-orange-700"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
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
                  className="w-full bg-transparent focus:outline-none text-orange-700"
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
                  className="w-full bg-transparent focus:outline-none text-orange-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="text-orange-500" size={20} />
                  ) : (
                    <Eye className="text-orange-500" size={20} />
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
                    className="w-full bg-transparent focus:outline-none text-orange-700"
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
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default SignupLoginForm;
