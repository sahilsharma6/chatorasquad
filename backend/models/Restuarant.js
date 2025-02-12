import mongoose from 'mongoose';

// Define the hotel schema
const RestuarantSchema = new mongoose.Schema(
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
const Restuarant = mongoose.model('Restuarant', RestuarantSchema);
export default Restuarant;
