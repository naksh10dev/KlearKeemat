import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // <--- Import this

export async function POST(request: Request) {
  try {
    const { mobile, password } = await request.json();
    await connectToDatabase();

    // 1. Find user by mobile only
    const user = await User.findOne({ mobile });
    
    // 2. If no user found, fail
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 3. Compare the typed password with the saved Hash (The Security Fix)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 4. Login successful
    return NextResponse.json({ 
      message: "Login successful", 
      user: { name: user.name, mobile: user.mobile, location: user.location } 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}