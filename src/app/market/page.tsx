"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Loader2 } from "lucide-react";

interface Crop {
  _id: string;
  name: string;
  location: string;
  price: string;
  quantity: string;
  mobile: string;
}

export default function MarketPage() {
  const [listings, setListings] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real data from the database
    const fetchCrops = async () => {
      try {
        const res = await fetch("/api/sell");
        const data = await res.json();
        if (data.crops) {
          setListings(data.crops);
        }
      } catch (error) {
        console.error("Error fetching market data");
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center text-slate-600 hover:text-green-600">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <Link href="/sell" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
            + Sell Crop
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Live Marketplace</h1>

        {loading ? (
          <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-green-600" /></div>
        ) : listings.length === 0 ? (
          <div className="text-center p-12 text-slate-500">No crops listed yet. Be the first to sell!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all">
                <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{item.location}</p>
                
                <div className="flex justify-between items-end">
                  <div>
                      <p className="text-xs text-slate-500 uppercase">Price</p>
                      <p className="font-bold text-slate-900 text-xl">₹{item.price}<span className="text-xs font-normal">/qt</span></p>
                      <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity} qt</p>
                  </div>
                  <a href={`tel:${item.mobile}`} className="flex items-center gap-2 text-green-600 border border-green-200 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-50">
                      <Phone className="w-4 h-4" /> Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}