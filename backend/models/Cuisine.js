import mongoose from "mongoose";

const CuisineSchema = mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        image: {
        type: String,
        },
        date: {
        type: Date,
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