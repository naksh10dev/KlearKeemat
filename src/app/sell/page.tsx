"use client";
import { useState } from "react";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a database
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Listing Added!</h2>
          <p className="text-slate-600 mb-6">Your crop has been listed on the KlearKeemat marketplace.</p>
          <Link href="/market" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
            View Market
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center text-slate-600 mb-6 hover:text-green-600">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Sell Your Produce</h1>
            <p className="opacity-90">Reach thousands of buyers directly.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Crop Name</label>
                <select className="w-full p-3 border rounded-lg bg-white" required>
                  <option>Select Crop</option>
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Onion</option>
                  <option>Potato</option>
                  <option>Soybean</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Variety (Optional)</label>
                <input type="text" placeholder="e.g. Basmati, Sharbati" className="w-full p-3 border rounded-lg" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Quantity (Quintals)</label>
                <input type="number" placeholder="100" className="w-full p-3 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Expected Price (₹/Quintal)</label>
                <input type="number" placeholder="2200" className="w-full p-3 border rounded-lg" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Upload Photo</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Click to upload photo of your harvest</p>
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors">
              List My Crop
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}