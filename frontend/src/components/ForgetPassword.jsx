import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import signupImg from "../assets/signup.png";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "", password: "",confirmPassword: "", });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
  
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await apiClient.post("/auth/forget-password", formData);
        if (res.status === 200) {
        //   setLoggedIn(true);
          navigate("/login");
        }
      } catch (err) {
        setErrors({
          email: "Invalid Credentials",
          password: "Invalid Credentials",
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

  if (loggedIn) {
    navigate("/");
  }

  return (
    <div
      className="w-full bg-cover bg-center flex items-center justify-center  text-center p-8"
      style={{
        backgroundImage: `url(${signupImg})`,
      }}
    >
      <div className="min-h-screen flex items-center justify-center ">
        <div className="flex bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl h-[40vh] md:h-[50vh]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className=" w-full md:w-1/2 p-8 flex flex-col justify-center "
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-700">
              Please Set Your Password
            </h2>
            <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Change Password
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-orange-500 cursor-pointer hover:underline"
              >
                Create New
              </span> Or {" "}
              <span onClick={() => navigate("/login")}
                className="text-orange-500 cursor-pointer hover:underline">
                  Login
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

export default ForgetPassword;
