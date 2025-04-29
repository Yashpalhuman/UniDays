import {connectDB} from '@/dbConfig/dbConfig'
import User from "@/models/userModel"
import {NextRequest, NextResponse} from 'next/server'  //same as req res of nodejs
import bcrypt from "bcryptjs"
import { sendMail } from '@/helpers/mailer';


connectDB();

export async function POST(req: NextRequest){
    try {
        const reqBody= await req.json()
        const {name, email, password, gender} = reqBody
        //validation Logic
        console.log(reqBody);

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already Exists"}, {status: 400})
        }
        let avatarUrl = "";

        if (gender === "Male") {
            avatarUrl = "/male-avataar.jpg";
          } else if (gender === "Female") {
            avatarUrl = "/female-avataar.jpg";
          } else {
            avatarUrl = "/others-avataar.jpg";
          }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        const lowerCaseEmail = email.toLowerCase();
        const newUser = new User ({
            name,
            email: lowerCaseEmail,
            password:hashedPassword,
            gender,
            avatar: avatarUrl,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //Send verification mail
        await sendMail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}