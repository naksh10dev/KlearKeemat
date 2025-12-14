// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Get the message from the frontend
    const { message } = await req.json();
    
    // 2. Connect to Google Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. Set the persona (Make it an Agri-Expert)
    const prompt = `You are an expert Indian Agriculture Assistant named 'KisanMitra'. 
    You help farmers with crop diseases, weather, and mandi prices. 
    Keep answers short, helpful, and in simple English.
    User asks: ${message}`;

    // 4. Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
  }
}