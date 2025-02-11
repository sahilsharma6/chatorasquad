import mongoose from "mongoose";


const roomSchema = mongoose.Schema(
    {
      
       hotelId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
            required: true,
        },

        room: {
            type:"String",
            required: true,
        },
    }
    ,
    {
        timestamps: true,
    }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
