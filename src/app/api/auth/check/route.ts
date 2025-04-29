import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.avatar,
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ isLoggedIn: false });
  }
}
