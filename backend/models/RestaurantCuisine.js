import mongoose from "mongoose";

const RestaurantCuisineSchema = mongoose.Schema(
    {

        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",  // Link to the Restaurant model
            required: true,
          },
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
            ref: "RestaurantMenu",
        },
        ],
    },
    {
        timestamps: true,
    }
    );

const RestaurantCuisine = mongoose.model("RestaurantCuisine", RestaurantCuisineSchema);

export default RestaurantCuisine;

