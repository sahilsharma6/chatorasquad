import mongoose from "mongoose";

const DeliverySchema = mongoose.Schema(
    {
        zipCode: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Delivery = mongoose.model("Delivery", DeliverySchema);

export default Delivery;