import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Crop from "@/models/Crop";

// 1. POST Function: Saves a new crop to the database
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Create new crop in database
    const newCrop = await Crop.create(body);
    
    return NextResponse.json(
      { message: "Crop listed successfully", crop: newCrop }, 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving crop", error }, 
      { status: 500 }
    );
  }
}

// 2. GET Function: Fetches all crops for the Market page
export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch crops, sorted by newest first (createdAt: -1)
    const crops = await Crop.find({}).sort({ createdAt: -1 }); 
    
    return NextResponse.json({ crops }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching crops" }, 
      { status: 500 }
    );
  }
}