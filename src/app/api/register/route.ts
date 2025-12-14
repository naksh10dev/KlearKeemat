import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // <--- Import this

export async function POST(request: Request) {
  try {
    const { name, mobile, password } = await request.json();
    await connectToDatabase();

    // 1. Check if user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // 2. Hash the password (The Security Fix)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user with the HASHED password
    await User.create({ 
      name, 
      mobile, 
      password: hashedPassword // <--- Save the hash, not the plain text
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error registering user" }, { status: 500 });
  }
}