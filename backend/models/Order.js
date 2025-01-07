import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    items: [
      {
        itemid: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Menu',
        },
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
        // enum: ['Pending', 'Paid', 'Failed'],
        },
    total: {
      type: Number,
      required: true,
    },
    deliveryAddress:{
        type:String,
        // required:true,
    },
    orderStatus:{
        type:String,
        required:true,
        // enum:['Order returned','Order Confirmed','Order Dispatched','Order Delivered','Order Cancelled'],
    },
    merchantTransactionId:{
        type:String,
        required:true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;