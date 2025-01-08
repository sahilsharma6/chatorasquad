import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {

      useUnifiedTopology: true,
      useNewUrlParser: true,
      
    });


    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;
//"mongodb+srv://jatin:1234@cluster0.xox4g.mongodb.net/ChatoraSquard"