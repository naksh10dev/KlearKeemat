"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a network delay for realism
    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">KlearKeemat</h1>
          <p className="opacity-90">Welcome back, Kisan!</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
            {isLogin ? "Login to your account" : "Register as a Farmer"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Ram Singh" />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
              <input type="tel" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="98765 43210" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="••••••••" required />
            </div>

            <button disabled={loading} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex justify-center items-center gap-2">
              {loading && <Loader2 className="animate-spin w-5 h-5" />}
              {loading ? "Verifying..." : (isLogin ? "Login" : "Register")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            {isLogin ? "New to KlearKeemat? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-green-600 font-bold hover:underline">
              {isLogin ? "Register Here" : "Login Here"}
            </button>
          </div>
        </div>
      </div>
      
      <Link href="/" className="mt-8 text-slate-500 flex items-center hover:text-green-600">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
    </div>
  );
}