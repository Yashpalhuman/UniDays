import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI!) //! is ensuring the MONGOURI will definitely come or u can use if else

        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log('MongoDB connected');
        })
        connection.on('error', (err)=>{
            console.log('Error in MongoDB connection:'+ err);
            process.exit()
        })

    } catch (error) {
        console.log("Oops! DB couldnt connect")
    }
}