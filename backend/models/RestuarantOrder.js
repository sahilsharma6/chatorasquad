import mongoose from "mongoose";

const RestaurantOrderSchema = mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel", // Links to the RestaurantMenu model
        required: true,
    },
    roomId: {
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
      enum: ["Processing","Delivered", "Cancelled"],
      default: "Processing",
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
