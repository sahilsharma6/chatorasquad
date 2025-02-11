import mongoose from "mongoose";

const RestuarantMenuSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    title:{
      type: String,
      default: "No Title",
    },
    type: {
      type: String,
      required: true,
      // enum: ["Veg", "Dairy", "Beverage"],
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      default :0
    },
    offerDates:{
      start:{type:Date , default: Date.now},
      end:{type:Date , default: Date.now},
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
    quantity: {
      type: Number,
      required: true,
      default:10,
    },
    // rating: {
    //   type: Number,
    //   default: 0,
    // },
    // reviews: {
    //   type: [String],
    // },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',  // Link to the Restaurant model
        required: true,
      },
  },
  
  {
    timestamps: true,
  }
);

const Restuarant = mongoose.model("Restuarant", RestuarantMenuSchema);

export default Restuarant;
