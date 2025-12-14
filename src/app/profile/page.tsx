"use client";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Tractor, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center text-slate-600 hover:text-green-600">
            <ArrowLeft className="w-4 h-4 mr-2" /> Home
          </Link>
          <Link href="/" className="flex items-center text-red-600 font-medium hover:text-red-700">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-slate-900 p-8 text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4 border-4 border-white">
              R
            </div>
            <h1 className="text-2xl font-bold text-white">Ram Singh</h1>
            <p className="text-slate-400">Registered Farmer • ID: KK-8821</p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <MapPin className="text-green-600 w-6 h-6" />
              <div>
                <p className="text-xs text-slate-500 uppercase">Location</p>
                <p className="font-semibold text-slate-900">Amritsar, Punjab</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <Tractor className="text-green-600 w-6 h-6" />
              <div>
                <p className="text-xs text-slate-500 uppercase">Primary Crop</p>
                <p className="font-semibold text-slate-900">Wheat (Sharbati)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/sell" className="bg-green-600 text-white p-4 rounded-xl text-center font-bold hover:bg-green-700">
            + Sell New Crop
          </Link>
          <Link href="/market" className="bg-white border border-slate-200 text-slate-900 p-4 rounded-xl text-center font-bold hover:bg-slate-50">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}