"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SellPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "Wheat",
    variety: "",
    quantity: "",
    price: "",
    mobile: "",
    location: ""
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to our new API
      const response = await fetch("/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to list crop. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Listing Successful!</h2>
          <p className="text-slate-600 mb-6">Your crop is now saved in the live database.</p>
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
            <p className="opacity-90">List your crop on the live market.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* 1. Crop Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Crop Name</label>
                <select name="name" onChange={handleChange} className="w-full p-3 border rounded-lg bg-white" required>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                  <option value="Potato">Potato</option>
                  <option value="Onion">Onion</option>
                  <option value="Soybean">Soybean</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Variety (Optional)</label>
                <input name="variety" onChange={handleChange} type="text" placeholder="e.g. Basmati" className="w-full p-3 border rounded-lg" />
              </div>
            </div>

            {/* 2. Pricing & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Quantity (Quintals)</label>
                <input name="quantity" onChange={handleChange} type="number" placeholder="100" className="w-full p-3 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Expected Price (₹/Quintal)</label>
                <input name="price" onChange={handleChange} type="number" placeholder="2200" className="w-full p-3 border rounded-lg" required />
              </div>
            </div>

            {/* 3. Contact Info (New!) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Location</label>
                <input name="location" onChange={handleChange} type="text" placeholder="e.g. Amritsar, Punjab" className="w-full p-3 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number</label>
                <input name="mobile" onChange={handleChange} type="tel" placeholder="9876543210" className="w-full p-3 border rounded-lg" required />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors flex justify-center items-center gap-2">
              {loading && <Loader2 className="animate-spin" />}
              {loading ? "Saving to Database..." : "List My Crop"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}