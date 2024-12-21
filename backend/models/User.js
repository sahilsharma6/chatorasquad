import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Invalid email format'], 
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6, 
    },
    age: {
      type: Number,
      default: 18,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    phoneNo: {
      type: Number,
      required: true,
      validate: {
        validator: function(v) {
        
          return /^[0-9]{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },
    address:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
        },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;