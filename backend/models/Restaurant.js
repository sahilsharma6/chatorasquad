import mongoose from 'mongoose';

// Define the hotel schema
const RestaurantSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true,  
      trim: true  
    },
    isValid: { 
      type: Boolean, 
      default: false 
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true, 
    }
  },
  {
    timestamps: true }
);

// Create and export the Hotel model
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
export default Restaurant;
