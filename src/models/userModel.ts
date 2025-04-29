import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //unique email
    name:{
        type:String,
        required: [true, "Please provide your full name"],
    },
    email:{
        type:String,
        required: [true, "Please provide a email"],
        unique: true,
        lowercase: true,
    },
    //password
    password:{
        type: String,
        required:[true,"Give a password"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: [true, "Please specify your gender"],
    },
    dob: {
        type: String,   // (or you can use `Date` if you want actual Date objects)
        required: false,
    },
    currentBatch: {
        type: Number,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },

  // Trip Relations
  tripsApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",   // Reference to Trip Model (you will create it later)
    }
  ],
  tripsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    }
  ],

    //Is user verified?
    isVerified: {
        type: Boolean,
        default: false
    },
    //Is user Admin?
    isAdmin: {
        type: Boolean,
        default: false
    },
    //Forgot password Handling
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,

    //Verify Token Handling
    verifyToken: String,
    verifyTokenExpiry: Date,

})

//Nextjs runs on edge so needs to handle if users is present or not!
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User