import mongoose from 'mongoose';

const AddressSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    zipCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      enum :["default","other"],
      default:"default"
    }
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', AddressSchema);

export default Address ;