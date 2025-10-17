import mongoose from "mongoose";
import { DB_NAME } from "../constant";


const connectDB=async()=>{
    try{
        const connectionDB=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected: ${connectionDB.connection.host}`);
    }catch(error){
        console.error("Mongoose connection Error : ",error);
        process.exit(1);

        
    }
}

export default connectDB