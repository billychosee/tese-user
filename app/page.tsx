"use client";

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    router.push("/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen p-5 overflow-hidden font-sans bg-black">
      {/* --- Background Image (Using standard img to avoid Next.js config errors) --- */}
      <img
        src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full opacity-60"
      />

      {/* --- Decorative Floating Shapes --- */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute w-32 h-32 rounded-full bg-green-500/20 blur-3xl top-[10%] left-[5%]" />
        <div className="absolute w-48 h-48 rounded-full bg-red-600/20 blur-3xl bottom-[10%] right-[5%]" />
      </div>

      {/* --- Glass Container --- */}
      <div className="relative z-20 w-full p-8 transition-all duration-500 border shadow-2xl max-w-md md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border-white/20">
        {/* Top Glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="text-white/70">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="relative group">
            <FaUser
              className="absolute -translate-y-1/2 left-4 top-1/2 text-white/60 group-focus-within:text-white"
              size={18}
            />
            <input
              type="text"
              placeholder="Username or Email"
              required
              className="w-full py-4 pl-12 pr-4 transition-all border text-white rounded-xl bg-white/10 border-white/10 placeholder:text-white/40 focus:outline-none focus:bg-white/20 focus:border-white/40"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <FaLock
              className="absolute -translate-y-1/2 left-4 top-1/2 text-white/60 group-focus-within:text-white"
              size={18}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full py-4 pl-12 pr-4 transition-all border text-white rounded-xl bg-white/10 border-white/10 placeholder:text-white/40 focus:outline-none focus:bg-white/20 focus:border-white/40"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer select-none text-white/80">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 rounded border-white/20 bg-white/10 accent-green-600"
                onChange={(e) =>
                  setFormData({ ...formData, remember: e.target.checked })
                }
              />
              Remember me
            </label>
            <button type="button" className="text-white/90 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Login Button with Zimbabwe Colors Gradient */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-green-700 via-yellow-500 to-red-600 text-white font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center py-2">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              Or
            </span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            <SocialIcon icon={<FaGoogle size={20} />} label="Google" />
            <SocialIcon icon={<FaFacebook size={20} />} label="Facebook" />
            <SocialIcon icon={<FaTwitter size={20} />} label="Twitter" />
          </div>

          <p className="text-sm text-center text-white/60">
            Don't have an account?
            <button
              type="button"
              className="ml-1 font-bold text-white hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

function SocialIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      title={`Sign in with ${label}`}
      className="flex items-center justify-center w-12 h-12 text-white transition-all border rounded-full bg-white/5 border-white/10 hover:bg-white/20 hover:border-white/30"
    >
      {icon}
    </button>
  );
}
