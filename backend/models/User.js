import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
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
    gender:{
      type:String,
      enum:['male','female'],

    },
    // address:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'Address',
    //     },
    // ],
    // orders: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Order',
    //   },
    // ],

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;