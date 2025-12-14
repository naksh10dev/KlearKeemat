import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const { name, mobile, password } = await request.json();
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Create new user
    await User.create({ name, mobile, password });
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error registering user" }, { status: 500 });
  }
}