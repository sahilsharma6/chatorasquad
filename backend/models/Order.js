import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Paid', 'Failed'],
        },
    total: {
      type: Number,
      required: true,
    },
    deliveryAddress:{
        type:String,
        required:true,
    },
    orderStatus:{
        type:String,
        required:true,
        enum:['Order returned','Order Confirmed','Order Dispatched','Order Delivered','Order Cancelled'],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;