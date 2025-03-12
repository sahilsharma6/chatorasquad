import mongoose from "mongoose";

const AdminOrderSchema =new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel", 
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room", 
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true, // Make sure this is required if necessary
      validate: {
        validator: function(v) {
          return /^[0-9]{10}$/.test(v); 
        },
        message: "Invalid phone number format!"
      }
    }
,    
    orderItems: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RestaurantMenu",
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
    subtotal:{
      type:Number,
    },
    gst: {
      type: Number,
      default: function () {
        // GST is 5% of totalPrice
        return this.totalPrice * 0.05;
      },
    },
    status: {
      type: String,
      enum: ["Processing", "Delivered", "Cancelled"],
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

const AdminOrder = mongoose.model("AdminRestaurantOrder", AdminOrderSchema);

export default AdminOrder;
