import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import apiClient from "../services/apiClient";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";





function ProfileSettings() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phoneNo: "",
  });

  const { user, loggedIn } = useContext(UserContext);


  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const [isVerificationEnabled, setIsVerificationEnabled] = useState(false);

  const toggleVerification = () => {
    setIsVerificationEnabled((prevState) => !prevState);
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  if(!loggedIn){
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-200 p-6 shadow-md transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:static md:inset-0`}
      >
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 border-orange-500 "
          />
          <h2 className="text-xl font-semibold mt-4">{user?.firstName}</h2>
        </div>
        <nav>
          <ul className="flex flex-col">
            <li className="mb-4">
              <button
                className="flex items-center font-medium text-gray-700 hover:text-red-600"
                onClick={() => navigate("/profile")}
              >
                <span className="mr-3">📋</span> Personal Information
              </button>
            </li>
            <li className="mb-4">
              <button
                className="flex items-center font-medium text-orange-500 hover:text-red-600"
                onClick={() => {
                  navigate("/update");
                  handleSideBar();
                }}
              >
                <span className="mr-3">⚙️</span> Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6 pt-16 md:pt-20">
        <div className="p-6 ">
          <div className="flex justify-between">
            <h1 className=" flex text-2xl font-bold mb-6 text-gray-800 md:justify-center justify-start">
              Security Settings
            </h1>
            <button className=" h-1/2 md:hidden" onClick={handleSideBar}>
              <HiOutlineMenuAlt3 className="text-2xl" />
            </button>
          </div>
          {/* Email Section */}
          <section className="mb-6">
            <div className="flex justify-between items-center ">
              <div>
                <h2
                  className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-orange-500"
                  onClick={() => toggleSection("email")}
                >
                  Email Address
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  The new email address to be associated with your account.
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="border-[2px] border-gray-300 py-2 px-4 rounded-2xl"
                  onClick={() => toggleSection("email")}
                >
                  <FaPen color="blue" />
                </button>
              </div>
            </div>

            {activeSection === "email" && (
              <div className="bg-white shadow-md rounded-lg p-6 flex flex-col mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-orange-600">
                    Login Email
                  </h3>
                  <AiOutlineClose
                    className="cursor-pointer"
                    size={20}
                    color="red"
                    onClick={() => toggleSection("email")}
                  />
                </div>
                <form className="mt-4 flex flex-col">
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={ user?.email}
                    className="mt-1 w-1/2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="current-password"
                    className="block text-sm text-gray-700 mt-4"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="mt-1 w-1/2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="m-2 w-auto p-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>

          <hr className="my-6" />

          {/* Password Section */}
          <section className="mb-6">
            <h2
              className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-orange-500"
              onClick={() => toggleSection("password")}
            >
              Password
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Set a unique password to protect your account.
            </p>
            {activeSection === "password" && (
              <div className=" bg-white shadow-md rounded-lg p-6 mt-4 w-auto">
                <div className=" flex justify-end">
                  <AiOutlineClose
                    className="cursor-pointer"
                    size={20}
                    color="red"
                    onClick={() => toggleSection("password")}
                  />
                </div>
                <form className="flex flex-col">
                  <label
                    htmlFor="current-password"
                    className="block text-sm text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="mt-1 w-1/2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="new-password"
                    className="block text-sm text-gray-700 mt-4"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="mt-1 w-1/2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="m-4 w-auto bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-600 transition"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
          <hr className="my-6" />
          {/* Phone Number Section */}
          <section className="mb-6">
            <h2
              className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-orange-500"
              onClick={() => toggleSection("phone")}
            >
              Phone Number
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Update your phone number for account recovery and notifications.
            </p>
            {activeSection === "phone" && (
              <div className="bg-white shadow-md rounded-lg p-6 mt-4 w-auto">
                <div className="flex justify-end">
                  <AiOutlineClose
                    size={20}
                    color="red"
                    onClick={() => toggleSection("phone")}
                  />
                </div>
                <form>
                  <label
                    htmlFor="new-phone"
                    className="block text-sm text-gray-700 mt-4"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="new-phone"
                    className="mt-1 w-1/2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your new phone number"
                  />
                  <button
                    type="submit"
                    className="m-4 w-auto bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-600 transition"
                  >
                    Update
                  </button>
                </form>
              </div>
            )}
          </section>
          <hr className="my-6" />
          {/* 2-Step Verification Section */}
          <section className="mb-6 flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 cursor-pointer">
                2-Step Verification
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Make your account extra secure. Along with your password, you'll
                need to enter a code.
              </p>
            </div>
            <div className="mt-4 flex items-center">
              <button
                className={`w-12 h-6 rounded-full flex items-center justify-${
                  isVerificationEnabled
                    ? "end bg-orange-500"
                    : "start bg-gray-300"
                }  p-1 transition`}
                onClick={toggleVerification}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${
                    isVerificationEnabled ? "transform translate-x-0.5" : ""
                  }`}
                />
              </button>
            </div>
          </section>
          <hr className="my-6" />

          {/* Deactivate Account Section */}
          <section className="mb-6">
            <h2
              className="text-lg font-semibold text-gray-700 cursor-pointer  hover:text-orange-500"
              onClick={() => toggleSection("deactivate")}
            >
              Deactivate Account
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Deactivating your account will temporarily disable it. You can
              reactivate it by signing in again.
            </p>
            {activeSection === "deactivate" && (
              <div className="w-auto flex justify-center align-center">
                <button className="mt-4 w-auto  bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition">
                  Deactivate Account
                </button>
              </div>
            )}
          </section>
          <hr className="my-6" />

          {/* Delete Account Section */}
          <section>
            <h2
              className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-orange-500"
              onClick={() => toggleSection("delete")}
            >
              Delete Account
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              This will permanently delete your account. This action cannot be
              undone.
            </p>
            {activeSection === "delete" && (
              <div className="w-auto flex justify-center align-center">
                <button className="mt-4 flex w-auto bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition ">
                  Delete Account
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
