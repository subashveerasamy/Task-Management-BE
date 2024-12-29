import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const dbConnection= async()=>{
    try {
        await mongoose.connect(process.env.connectionString);
        console.log("connected db")
    } catch (error) {
        console.log("db error");
    }
}

export default dbConnection;