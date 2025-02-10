import mongoose from 'mongoose';

// Define the hotel schema
const hotelSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true,  
      trim: true  
    },
    phoneNo: { 
      type: String, 
      required: true,
      match: /^[0-9]{10}$/, 
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
    },
    room:{
        type: Array,
    }
  },
  {
    timestamps: true }
);

// Create and export the Hotel model
const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
