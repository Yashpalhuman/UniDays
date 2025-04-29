import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (req : NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        console.log(token)
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!); //decode token contains const tokenData = { id : user._id, email: user.email,}
        console.log(decodedToken)
        return decodedToken.id
    } catch (error: any) {
        throw new Error(error.message)
    }
}
