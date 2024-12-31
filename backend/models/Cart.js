import mongoose from 'mongoose';

const CartSchema = mongoose.Schema(
    {
        userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
        total: {
        type: Number,
        required: true,
        },
    },
    {
        timestamps: true,
    }
    );

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
