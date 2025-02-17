import mongoose from 'mongoose';

// Define the hotel schema
const hotelSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: false, 
      unique: true,  
      trim: true  
    },
    address: {
      type: String,
      trim: true,
      default: ''
    },
    phoneNo: {
      type: String,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    isValid: { 
      type: Boolean, 
      default: false 
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
    protected_password: {
      type: String,
      required: true,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Create and export the Hotel model
const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
