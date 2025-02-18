import mongoose from "mongoose";

const RestaurantOrderSchema = mongoose.Schema(
  {
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel", // Links to the RestaurantMenu model
        required: true,
    },
    roomNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room", // Links to the RestaurantMenu model
        required: true,
    },
    orderItems: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RestaurantMenu", // Links to the RestaurantMenu model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Delivered", "Cancelled"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const RestaurantOrder = mongoose.model("RestaurantOrder", RestaurantOrderSchema);

export default RestaurantOrder;
