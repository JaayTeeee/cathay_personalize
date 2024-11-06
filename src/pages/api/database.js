import mongoose from 'mongoose';
import dotenv from 'dotenv';

const uri = "mongodb+srv://dbUser:password1234!@cluster0.nxkwhdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

dotenv.config();

export default async function testConnection (){
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
        });
        console.log("Connected to MongoDB!");

    } catch (error) {
        console.error("Connection error:", error);
    }
};

