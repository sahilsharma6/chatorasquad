import mongoose from "mongoose";

const MenuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      // enum: ["Veg", "Non-Veg", "Egg"],
    },
    sellingprice: {
      type: Number,
      required: true,
    },
    discountedprice: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      // required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    Cuisine: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
