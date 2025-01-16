import mongoose from "mongoose";

const CuisineSchema = mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        date: {
        type: Date,
        default: Date.now,
        },
        items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
        },
        ],
    },
    {
        timestamps: true,
    }
    );

const Cuisine = mongoose.model("Cuisine", CuisineSchema);

export default Cuisine;