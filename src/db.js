import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        await mongoose.connect("mongodb+srv://christopfa9:DWWvSdFn7A9RsAcl@tarea1.jyfc2.mongodb.net/?retryWrites=true&w=majority&appName=tarea1");
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
};
