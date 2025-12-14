"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Tractor, LogOut, Mail } from "lucide-react";

interface Msg {
  sender: string;
  senderMobile: string;
  content: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [user, setUser] = useState({ name: "Ram Singh", location: "Punjab" });

  useEffect(() => {
    // 1. Load User Info
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // 2. Fetch Messages (Inbox)
    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/message");
            const data = await res.json();
            if (data.messages) setMessages(data.messages);
        } catch (e) { console.error(e); }
    };
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center text-slate-600 hover:text-green-600">
            <ArrowLeft className="w-4 h-4 mr-2" /> Home
          </Link>
          <Link href="/login" className="flex items-center text-red-600 font-medium hover:text-red-700">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-slate-900 p-8 text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4 border-4 border-white">
              {user.name.charAt(0)}
            </div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-slate-400">Farmer • {user.location}</p>
          </div>
          <div className="p-8 grid grid-cols-2 gap-4">
             <Link href="/sell" className="bg-green-600 text-white p-4 rounded-xl text-center font-bold hover:bg-green-700">
               + Sell Crop
             </Link>
             <Link href="/market" className="bg-white border border-slate-200 text-slate-900 p-4 rounded-xl text-center font-bold hover:bg-slate-50">
               View Market
             </Link>
          </div>
        </div>

        {/* INBOX SECTION */}
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-600"/> My Inbox
        </h2>

        <div className="space-y-4">
            {messages.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No messages yet.</p>
            ) : (
                messages.map((msg, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-slate-900">{msg.sender}</span>
                            <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">{msg.content}</p>
                        <div className="text-xs text-green-600 font-bold">
                            Contact: {msg.senderMobile}
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}