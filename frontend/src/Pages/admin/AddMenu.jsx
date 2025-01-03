import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import apiClient from "../../services/apiClient";

const AddMenu = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    type: "",
    cuisine: "",
    quantity: "",
    sellingPrice: 0,
    description: "",
    discountedPrice:0,
    images: [], 
  });

  const [errors, setErrors] = useState({});
  const [cuisines, setCuisines] = useState([]); 

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await apiClient.get("/admin/cuisines");
        console.log(response.data);
        
        setCuisines(response.data); 
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    };
    fetchCuisines();
  }, []);
  // console.log(formData);
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Dish Name is required";
    if (!formData.sellingPrice) newErrors.sellingPrice = "Price is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (formData.images.length === 0) newErrors.images = "Dish Image is required";
    if(!formData.cuisine) newErrors.cuisine='Cusine is Requierd'
    if(!formData.type) newErrors.type='Type is Requierd'
    return newErrors;
  };

  const handelAdd = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("cuisine", formData.cuisine);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("sellingPrice", formData.sellingPrice);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("discountedPrice", formData.discountedPrice);


    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const response = await apiClient.post("/menu/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setFormData({
        name: "",
        title: "",
        type: "",
        cuisine: "",
        quantity: "",
        sellingPrice: 0,
        description: "",
        discountedPrice:0,
        images: [], 
      })
   
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setFormData({
        ...formData,
        images: Array.from(files),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg transition-all"
    >
      <h1 className="text-4xl text-center mb-6">Add Dish</h1>
      <form className="space-y-6" onSubmit={handelAdd}>
        {/* Dish Name and Title */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Dish Name</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="Enter Dish Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Dish Title</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder="Enter Dish Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
        </div>

        {/* Dish Type and Cuisine */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Select Dish Type</label>
            <select
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option >Select a Value</option>
              <option>Veg</option>
              <option>Beverages and Dairyproduct</option>
            </select>{errors.type && (
              <p className="text-red-500 text-sm">{errors.type}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Cuisine</label>
            <select
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              value={formData.cuisine}
              onChange={(e) =>
                setFormData({ ...formData, cuisine: e.target.value })
              } required
            >
              {/* Render cuisine options dynamically */}
              <option value="" defaultValue={'Select a Cusine'}  >Select a Cusine</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine._id} value={cuisine.name}   >
                  {cuisine.name}
                </option>
              ))}
            </select>
            {errors.cuisine && (
              <p className="text-red-500 text-sm">{errors.cuisine}</p>
            )}
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
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Selling Price</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder=" ₹100"
              value={formData.sellingPrice}
              onChange={(e) =>
                setFormData({ ...formData, sellingPrice: e.target.value })
              }
            />
            {errors.sellingPrice && (
              <p className="text-red-500 text-sm">{errors.sellingPrice}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Discounted Price</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="number"
              className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
              placeholder=" ₹100"
              value={formData.discountedPrice}
              onChange={(e) =>
                setFormData({ ...formData, discountedPrice: e.target.value })
              }
            />
            {errors.sellingPrice && (
              <p className="text-red-500 text-sm">{errors.sellingPrice}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className="w-full px-4 py-4 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
            placeholder="Message"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Dish Images */}
        <div>
          <label className="block text-gray-700 mb-2">Dish Images</label>
          <div className="flex items-center space-x-4">
            <motion.input
              multiple
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1 px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-700 border-orange-500"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              <Upload size={36} />
            </motion.button>
          </div>
          {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddMenu;
