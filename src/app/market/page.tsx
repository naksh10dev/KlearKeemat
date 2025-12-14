"use client";
import Link from "next/link";
import { ArrowLeft, Filter, Phone } from "lucide-react";

export default function MarketPage() {
  const listings = [
    { name: "Organic Wheat", location: "Punjab, Amritsar", price: "2300", quantity: "50 Qt", seller: "Rajinder Singh" },
    { name: "Fresh Onions", location: "Nashik, Maharashtra", price: "1850", quantity: "20 Qt", seller: "Vijay Patil" },
    { name: "Basmati Rice", location: "Haryana, Karnal", price: "3500", quantity: "100 Qt", seller: "Suresh Kumar" },
    { name: "Soybean Gold", location: "Indore, MP", price: "4600", quantity: "30 Qt", seller: "Mohan Lal" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center text-slate-600 hover:text-green-600">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <Link href="/sell" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
              + Sell Crop
            </Link>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Live Marketplace</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-slate-200 flex items-center justify-center text-slate-400">
                Crop Image
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.location}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase">Price</p>
                    <p className="font-bold text-slate-900">₹{item.price}<span className="text-xs font-normal text-slate-500">/qt</span></p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase">Quantity</p>
                    <p className="font-bold text-slate-900">{item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm font-medium text-slate-600">{item.seller}</span>
                  <button className="flex items-center gap-2 text-green-600 border border-green-200 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-50">
                    <Phone className="w-4 h-4" /> Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}