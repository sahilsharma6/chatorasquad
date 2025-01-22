import React from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Heart, Trash2 } from "lucide-react";

export default function CartItems({ item, updateQuantity, removeItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border rounded-lg mb-4"
    >
      <div className="flex gap-4">
        <img
          src={
            item.images && item.images[0]
              ? import.meta.env.VITE_API_URL + "/" + item.images[0]
              : "/default-image.jpg"
          }
          alt={item.name}
          className="w-24 h-24 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.restaurant}</p>
          <div className="flex items-center mt-2">
            <span className="text-xl font-bold">₹{item.sellingPrice}</span>
            {/* <span className="ml-2 line-through text-gray-500">
              ₹{item.originalPrice}
            </span> */}
            {/* <span className="ml-2 text-green-600">{item.discount}% of</span> */}
          </div>
          <p className="text-sm text-gray-500 mt-1">{item.delivery}</p>
        </div>
      </div>
      {/* Quantity and Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-4 mt-6">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
            className="p-2 hover:bg-gray-100"
          >
            <Minus size={20} />
          </button>
          <span className="px-4 py-2 border-x">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
            className="p-2 hover:bg-gray-100"
          >
            <Plus size={20} />
          </button>
        </div>
        {/* <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Heart size={20} />
          <span>Save for Later</span>
        </button> */}
        <button
          onClick={() => removeItem(item.itemId)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <Trash2 size={20} />
          <span>Remove</span>
        </button>
      </div>
    </motion.div>
  );
}
