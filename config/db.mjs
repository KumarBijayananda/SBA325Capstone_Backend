//Dependencies
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

//Initialize mongo connection string from .env 
const db= process.env.mongoURI

//connect to DB using mongoose
const connectDB = async () => {
    try {
      await mongoose.connect(db);
  
    } catch (err) {
      console.error(err.message);
  
      process.exit(1);
    }
  };

  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB`, mongoose.connection.name);
  });
  
  export default connectDB;