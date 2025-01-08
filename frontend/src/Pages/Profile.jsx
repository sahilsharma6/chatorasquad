import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiPlus, HiPlusCircle } from "react-icons/hi";
import apiClient from "../services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../context/UserContext";
import { useContext } from "react";


const Profile = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });

  const [contactInfo, setContactInfo] = useState({ email: "", phoneNo: "" });

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    zipcode: "",
    city: "",
    state: "",
    location: "",
  });

  const { loggedIn } = useContext(UserContext);

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await apiClient.get("/user/details");
        const { firstName, lastName, age, gender, email, phoneNo } =
          userRes.data;
        setPersonalInfo({ firstName, lastName, age, gender: gender || "" });
        setContactInfo({ email, phoneNo });

        const addressRes = await apiClient.get("user/getaddresses");
        setAddresses(addressRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const savePersonalInfo = async () => {
    try {
      await apiClient.put("/user/updatedetails", personalInfo);

      toast.success("Personal information updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating personal information:", error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const saveAddress = async () => {
    try {
       const response = await apiClient.post("/user/addaddress", newAddress);
      setAddresses([...addresses, response.data.address]);
      setNewAddress({  _id: "", zipcode: "", city: "", state: "", location: ""  });
      toast.success("Address added successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
 


  if (!loggedIn) {
    navigate("/login");
  }


   
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <ToastContainer />
        {/* Sidebar */}
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
            <h2 className="text-xl font-semibold mt-4 ">
              {personalInfo.firstName}
            </h2>
          </div>
          <nav>
            <ul className="flex flex-col">
              <li className="mb-4">
                <button
                  className="flex items-center text-orange-500 hover:text-red-600 font-medium"
                  onClick={() => {
                    navigate("/profile");
                    handleSideBar();
                  }}
                >
                  <span className="mr-3">📋</span> Personal Information
                </button>
              </li>
              <li className="mb-4">
                <button
                  className="flex items-center text-gray-700 hover:text-red-600 font-medium"
                  onClick={() => navigate("/update")}
                >
                  <span className="mr-3">⚙️</span> Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 pt-16 md:pt-20">
          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="number"
                name="age"
                value={personalInfo.age}
                onChange={handlePersonalInfoChange}
                placeholder="Age"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <select
                name="gender"
                value={personalInfo.gender}
                onChange={handlePersonalInfoChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <button
                type="button"
                className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600"
                onClick={savePersonalInfo}
              >
                Save
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="mb-2">
              <strong>Email:</strong> {contactInfo.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {contactInfo.phoneNo}
            </p>
          </div>

          {/* Address Management Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Addresses</h2>
            {addresses.length > 0 ? (
              addresses.map((addr, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg mb-4 flex justify-between items-center ${
                    addr.type === "default"
                      ? "bg-orange-100 border-2 border-orange-500 shadow-lg"
                      : "bg-gray-100"
                  }`}
                >
                  <div>
                    {addr.type === "default" && (
                      <span className="px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded-full">
                        Default
                      </span>
                    )}
                    <p className="font-semibold mt-2">{addr.location}</p>
                    <p>
                      {addr.city}, {addr.state}
                    </p>
                    <p>ZIP: {addr.zipCode}</p>
                  </div>
                  <div>
                    {addr.type !== "default" && (
                      <button
                        className="px-4 py-2 mt-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600"
                        onClick={async () => {
                          try {
                            await apiClient.put(
                              `user/setdefaultaddress/${addr._id}`
                            );
                            toast.success("Default address set successfully!");
                            const updatedAddresses = addresses.map((a) => ({
                              ...a,
                              type: a._id === addr._id ? "default" : "other",
                            }));
                            setAddresses(updatedAddresses);
                          } catch (error) {
                            console.error(
                              "Error setting default address:",
                              error
                            );
                            toast.error("Failed to set default address.");
                          }
                        }}
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No addresses available</p>
            )}

            <h3 className="text-lg flex  items-center font-semibold mt-4">
              <HiPlusCircle /> Add New Address
            </h3>

            <form className="flex flex-col gap-4 mt-4 boder-2 border-t-2 border-orange-600 pt-4">
              <input
                type="number"
                name="zipcode"
                value={newAddress.zipcode}
                onChange={handleAddressChange}
                placeholder="Postal Code"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleAddressChange}
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleAddressChange}
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="location"
                value={newAddress.location}
                onChange={handleAddressChange}
                placeholder="Detailed Location"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600"
                onClick={saveAddress}
              >
                Add Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
