import {connectDB} from '@/dbConfig/dbConfig'
import User from "@/models/userModel"
import {NextRequest, NextResponse} from 'next/server'  //same as req res of nodejs
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB();

export async function POST(req: NextRequest){
    try {
        const reqBody= await req.json()
        const {email, password} = reqBody
        //validation Logic
        console.log(reqBody);
        const lowerCaseEmail = email.toLowerCase();
        console.log(lowerCaseEmail);
        const user = await User.findOne({email: lowerCaseEmail});
        if(!user){
            return NextResponse.json({error: "User do not exists"}, {status: 400})
        }
        console.log("User exits");
        
        if(!user.isVerified){
            return NextResponse.json({error: "User is not verified"}, {status: 400})
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){return NextResponse.json({error: "Oops! check your credentials"}, {status: 400})}

        const tokenData = {
            id : user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '2h'}) //secret hoga hi

        const response = NextResponse.json({
            message: "Signed-in successfully",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,  //Cookie can be manipulated by server only users can see it but cant change!!
            maxAge: 59 * 60
        });

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
