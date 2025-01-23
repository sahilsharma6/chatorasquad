import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../../services/apiClient";
import { toast, ToastContainer } from "react-toastify";

const EditMenu = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState({
    name: "",
    title: "",
    type: "",
    Cuisine: "",
    quantity: "",
    sellingPrice: 0,
    description: "",
    discountedPrice: 0,
    images: [],
  });
  const [cuisines, setCuisines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get(`/menu/getdetails/${menuId}`)
      .then((response) => {
        setMenuData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu details:", error);
        setError("Failed to fetch menu details");
      });

    apiClient
      .get("/admin/cuisines")
      .then((response) => {
        setCuisines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cuisines:", error);
      });
  }, [menuId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      setMenuData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...Array.from(files)],
      }));
    }
  };

  const handleDeleteImage = (index) => {
    setMenuData((prevData) => {
      const newImages = prevData.images.filter((_, i) => i !== index);
      return { ...prevData, images: newImages };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      menuData.discountedPrice &&
      parseFloat(menuData.discountedPrice) > parseFloat(menuData.sellingPrice)
    ) {
      setError("Discounted price cannot be greater than the selling price.");
      return;
    }

    const formData = new FormData();
    Object.keys(menuData).forEach((key) => {
      if (key === "images") {
        // Include old images that are not deleted
        menuData.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image); // New file
          } else {
            formData.append("oldImages", image); // Existing file path
          }
        });
      } else {
        formData.append(key, menuData[key]);
      }
    });

    apiClient
      .put(`/menu/update/${menuId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
           toast.success('Dish Edited successfully',
              {
                position: "top-right",
                autoClose: 2000,
              }
            );
            setTimeout(()=>  navigate("/admin/menu/view"),2000)
       
      })
      .catch((error) => {
        console.error("Error updating menu:", error);
        setError("Failed to update menu");
      });
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg transition-all"
    >
      <h1 className="text-4xl text-center mb-6">Edit Menu</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Dish Name */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Dish Name</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="Enter Dish Name"
              name="name"
              value={menuData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Dish Title</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="Enter Dish Name"
              value={menuData.title}
              onChange={(e) =>
                setMenuData({ ...menuData, title: e.target.value })
              }
            />
            {/* {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )} */}
          </div>
        </div>

        {/* Dish Type and Cuisine */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Select Dish Type</label>
            <select
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              name="type"
              value={menuData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Type</option>
              <option value="Veg">Veg</option>
              <option value="Beverages">Beverages</option>
              <option value="Dairy">Dairy</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Cuisine</label>
            <select
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              name="cuisine"
              value={menuData.Cuisine} // Fixed the casing here
              onChange={handleInputChange}
              required
            >
              {/* <option value={menuData.cuisine}>Select a cuisine</option> */}
              {cuisines.map((cuisine) => (
                <option key={cuisine._id} value={cuisine.name} >
                  {cuisine.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity and Selling Price */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Quantity</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="01"
              name="quantity"
              value={menuData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Selling Price</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder=" ₹100"
              name="sellingPrice"
              value={menuData.sellingPrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Discounted Price</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder=" ₹100"
              name="discountedPrice"
              value={menuData.discountedPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className="w-full px-4 py-4 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
            placeholder="Enter Description"
            name="description"
            value={menuData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Dish Images */}
        <div>
          <label className="block text-gray-700 mb-2">Dish Images</label>
          <div className="flex flex-wrap gap-4">
            <input
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
              className="flex-1 px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
            />

            {menuData.images.map((file, index) => (
              <div key={index} className="flex items-center space-x-2">
                <img
                  src={file instanceof File ? URL.createObjectURL(file) : import.meta.env.VITE_API_URL + "/" + file}
                  alt={`Preview ${index}`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                {file instanceof File && (
                  <p className="text-gray-600 text-sm">{file.name}</p>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Save Changes
        </motion.button>
      </form>
      <ToastContainer />
    </motion.div>
  );
};

export default EditMenu;