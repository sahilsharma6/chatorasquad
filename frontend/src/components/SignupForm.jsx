import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../services/apiClient";
import signupImage from "../assets/signup.png";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    confirmPassword: "",
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      newErrors.fullName = "First name and last name is required";
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

    if (!formData.phoneNo.trim()) {

      newErrors.phoneNo = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Invalid phone number. It must be 10 digits long and contain only numbers";
    }
    if (!formData.role) {
      console.log('sd');
      
      newErrors.role = 'Role Must be Admin User or hotel'
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      try {
        const res = await apiClient.post("/auth/signup", formData);
        if (res.status === 201) {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
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
console.log(errors);

  return (
    <div
      className="w-full bg-cover bg-center flex items-center justify-center  text-center "
      style={{
        backgroundImage: `url(${signupImage})`,
      }}
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl h-fit">
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className=" w-full md:w-1/2 p-8 flex flex-col justify-center "
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex items-center border-b-2 border-orange-300 py-2">
                  <User className="text-orange-500 mr-3" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-center border-b-2 border-orange-300 py-2">
                  <User className="text-orange-500 mr-3" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>
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
                  <Mail className="text-orange-500 mr-3" />
                  <input

                    type="number"
                    name="phoneNo"
                    min="10"

                    placeholder="Phone Number"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />
                </div>
                {errors.phoneNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
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
                  {console.log(formData)
                  }
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-center border-orange-300 py-2">
                  <User className="text-orange-500 mr-3" />
                  <label className="mr-4"> Admin
                    <input
                      type="radio"
                      name="role"
                      value="admin" // Set the value for admin role
                      checked={formData.role === "admin"} // Check if this is the selected role
                      onChange={handleChange}
                      className="mr-2 ml-2 scale-125 accent-orange-500"
                    />
                  </label>
                  <label className="mr-4"> User
                    <input
                      type="radio"
                      name="role"
                      value="user" // Set the value for user role
                      checked={formData.role === "user"} // Check if this is the selected role
                      onChange={handleChange}
                      className="mr-2 ml-2 scale-125 accent-orange-500"
                    />
                  </label>
                  <label className="mr-4"> Hotel
                    <input
                      type="radio"
                      name="role"
                      value="hotel" // Set the value for hotel role
                      checked={formData.role === "hotel"} 
                      onChange={handleChange}
                      className="mr-2 ml-2 scale-125 accent-orange-500"
                    />
                  </label>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Create Account
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-orange-500 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
