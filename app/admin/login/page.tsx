"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0f] p-4 relative overflow-hidden">
        <div className="w-full max-w-md p-8 rounded-2xl relative z-10 text-center" style={{background:"#16161a", border:"1px solid rgba(255,255,255,0.08)"}}>
          <h2 className="font-display font-bold text-2xl text-[#f87171] mb-4">Setup Required</h2>
          <p className="text-[rgba(238,238,242,0.6)] leading-relaxed">
            Firebase is not configured yet. Please copy <code className="bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded text-[#eeeef2]">.env.local.example</code> to <code className="bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded text-[#eeeef2]">.env.local</code> and fill in your Firebase API keys to enable the admin panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0f] p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{background:"rgba(79,142,247,0.06)"}} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl relative z-10"
        style={{background:"#16161a", border:"1px solid rgba(255,255,255,0.08)"}}
      >
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-[#eeeef2] mb-2">Admin Panel</h1>
          <p className="text-sm text-[rgba(238,238,242,0.5)]">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5 text-[rgba(238,238,242,0.5)]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all"
              style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#eeeef2"}}
              onFocus={e => (e.currentTarget.style.borderColor = "#4f8ef7")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5 text-[rgba(238,238,242,0.5)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all"
              style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#eeeef2"}}
              onFocus={e => (e.currentTarget.style.borderColor = "#4f8ef7")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              required
            />
          </div>

          {error && <p className="text-[#f87171] text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 mt-4"
            style={{background: "#eeeef2", color: "#0d0d0f"}}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
