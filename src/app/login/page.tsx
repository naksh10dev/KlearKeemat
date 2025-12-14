"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", mobile: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "/api/login" : "/api/register";
    
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
            localStorage.setItem("user", JSON.stringify(data.user));
            // Force a hard refresh to update the navbar state
            window.location.href = "/profile"; 
        } else {
            alert("Registration Successful! Please Login.");
            setIsLogin(true);
        }
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server. Check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-green-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">KlearKeemat</h1>
          <p className="opacity-90">{isLogin ? "Welcome Back!" : "Join the Community"}</p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
            {isLogin ? "Login to your account" : "Register as a Farmer"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 bg-white placeholder:text-slate-400 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Ram Singh"
                  required 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Mobile Number</label>
              <input 
                type="tel" 
                className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 bg-white placeholder:text-slate-400 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="9876543210"
                required 
                onChange={(e) => setFormData({...formData, mobile: e.target.value})} 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 bg-white placeholder:text-slate-400 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="••••••••"
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>

            <button disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 flex justify-center items-center gap-2 shadow-lg transition-all">
              {loading && <Loader2 className="animate-spin w-5 h-5" />}
              {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <button onClick={() => setIsLogin(!isLogin)} className="text-green-600 font-bold hover:underline">
              {isLogin ? "Create New Account" : "Login to Existing Account"}
            </button>
          </div>
        </div>
      </div>
      <Link href="/" className="mt-8 text-slate-500 flex items-center hover:text-green-600 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
    </div>
  );
}