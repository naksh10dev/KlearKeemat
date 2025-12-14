import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Message from "@/models/Message";

// 1. SEND Message (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    await Message.create(body);
    return NextResponse.json({ message: "Message sent!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error sending" }, { status: 500 });
  }
}

// 2. GET Messages (For Inbox)
export async function GET() {
  try {
    await connectToDatabase();
    // Get all messages, newest first
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching" }, { status: 500 });
  }
}