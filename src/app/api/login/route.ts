import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const { mobile, password } = await request.json();
    await connectToDatabase();

    // Find user
    const user = await User.findOne({ mobile, password });
    
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Return user info (excluding password)
    return NextResponse.json({ 
      message: "Login successful", 
      user: { name: user.name, mobile: user.mobile, location: user.location } 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}