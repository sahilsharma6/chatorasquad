import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        menuId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Menu",
            required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        rating:{
            type:Number,
            // required:true
        },
        review:{
            type:String,
            // required:true
        }
    },
    {
        timestamps:true
    }
);

const Reviews = mongoose.model("Reviews",reviewSchema);

export default Reviews;