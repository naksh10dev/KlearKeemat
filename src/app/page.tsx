
import Link from "next/link";
import PriceTicker from "@/components/PriceTicker";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* 1. Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* Logo K */}
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
            {/* App Name */}
            <span className="font-bold text-xl text-slate-800">KlearKeemat</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <Link href="/market" className="hover:text-green-600 transition-colors">Market</Link>
            <Link href="#" className="hover:text-green-600 transition-colors">Weather</Link>
            <Link href="#" className="hover:text-green-600 transition-colors">Schemes</Link>
          </div>

          {/* Login Button - Now Functional! */}
          <Link href="/login" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Login
          </Link>
        </div>
      </nav>

      {/* 2. Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Real-Time Ticker */}
        <PriceTicker />

        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            <span className="text-green-600">KlearKeemat</span> <br/>
            Transparent Prices for Farmers
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Connect directly with buyers, get real-time Mandi rates via government APIs, and consult our AI expert for crop advice.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* BUTTON 1: Link to the Sell Page */}
            <Link href="/sell" className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-200 transition-all flex items-center justify-center">
              Start Selling Crop
            </Link>
            
            {/* BUTTON 2: Link to the Market Page */}
            <Link href="/market" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center justify-center">
              Find Produce
            </Link>
          </div>
        </div>

      </div>

      {/* 3. The AI Chatbot */}
      <ChatWidget />
    </main>
  );
}