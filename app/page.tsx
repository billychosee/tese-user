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
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Check for backdrop-filter support
    const hasSupport =
      CSS.supports("backdrop-filter", "blur(1px)") ||
      CSS.supports("-webkit-backdrop-filter", "blur(1px)");
    if (!hasSupport) {
      setShowNotice(true);
      const timer = setTimeout(() => setShowNotice(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    alert(`Welcome back, ${formData.username}!`);
    router.push("/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen p-5 overflow-hidden font-sans bg-linear-to-br from-zimbabwe-red to-zimbabwe-green">
      {/* CSS Keyframes for floating background */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        .animate-float-reverse {
          animation: float 18s infinite ease-in-out reverse;
        }
        .animate-float-slow {
          animation: float 20s infinite ease-in-out;
        }
      `}</style>

      {/* --- Background Shapes --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-20 h-20 rounded-full bg-white/10 backdrop-blur-md top-[20%] left-[10%] animate-float" />
        <div className="absolute w-32 h-32 rounded-full bg-white/10 backdrop-blur-md top-[60%] right-[15%] animate-float-reverse" />
        <div className="absolute w-16 h-16 rounded-full bg-white/10 backdrop-blur-md bottom-[20%] left-[20%] animate-float-slow" />
        <div className="absolute w-24 h-24 rounded-full bg-white/10 backdrop-blur-md top-[15%] right-[20%] animate-float-reverse" />
      </div>

      {/* --- Glass Container --- */}
      <div className="relative z-10 w-full p-8 transition-all duration-500 border shadow-2xl max-w-105 md:p-10 rounded-3xl bg-zimbabwe-white/10 backdrop-blur-xl border-zimbabwe-white/20 hover:shadow-zimbabwe-white/5">
        {/* Top Highlight line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zimbabwe-white/40 to-transparent" />

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-zimbabwe-white">
            Welcome Back
          </h1>
          <p className="text-zimbabwe-white/70">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative group">
            <FaUser
              className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-white/70 group-focus-within:text-white"
              size={20}
            />
            <input
              type="text"
              placeholder="Username or Email"
              required
              className="w-full py-4 pl-12 pr-4 transition-all border text-zimbabwe-white rounded-xl bg-zimbabwe-white/15 border-zimbabwe-white/10 placeholder:text-zimbabwe-white/50 focus:outline-none focus:bg-zimbabwe-white/25 focus:border-zimbabwe-white/40"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <FaLock
              className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-white/70 group-focus-within:text-white"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full py-4 pl-12 pr-4 transition-all border text-zimbabwe-red rounded-xl bg-zimbabwe-white/15 border-zimbabwe-white/10 placeholder:text-zimbabwe-red focus:outline-none focus:bg-zimbabwe-white/25 focus:border-zimbabwe-white/40"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer select-none text-zimbabwe-white/80">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 rounded cursor-pointer border-zimbabwe-white/20 bg-zimbabwe-white/10 accent-zimbabwe-red"
                onChange={(e) =>
                  setFormData({ ...formData, remember: e.target.checked })
                }
              />
              Remember me
            </label>
            <button
              type="button"
              className="transition-colors text-zimbabwe-white/90 hover:text-zimbabwe-white hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-linear-to-r from-zimbabwe-green to-zimbabwe-yellow border border-zimbabwe-red text-zimbabwe-white font-bold text-lg hover:from-zimbabwe-green/90 hover:to-zimbabwe-yellow/90 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-zimbabwe-red/20"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center py-2">
            <div className="flex-1 h-px bg-zimbabwe-white/20"></div>
            <span className="px-4 text-[10px] uppercase tracking-[0.2em] text-zimbabwe-white/40 font-bold">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-zimbabwe-white/20"></div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <SocialIcon icon={<FaGoogle size={22} />} label="Google" />
            <SocialIcon icon={<FaFacebook size={22} />} label="Facebook" />
            <SocialIcon icon={<FaTwitter size={22} />} label="Twitter" />
          </div>

          <p className="text-sm text-center text-zimbabwe-white/60">
            Don't have an account?
            <button
              type="button"
              className="ml-1 font-bold text-zimbabwe-white hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>

      {/* Fallback Notice */}
      {showNotice && (
        <div className="fixed z-50 flex items-center gap-2 px-6 py-3 -translate-x-1/2 border rounded-full shadow-xl text-zimbabwe-white bottom-6 left-1/2 bg-zimbabwe-black/80 backdrop-blur-md border-zimbabwe-white/10 animate-bounce">
          <FaExclamationTriangle size={18} />
          <span className="text-sm">
            Please use a modern browser for the best experience.
          </span>
        </div>
      )}
    </div>
  );
}

// Sub-component for Social Buttons
function SocialIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      title={`Sign in with ${label}`}
      className="flex items-center justify-center w-12 h-12 text-white transition-all border rounded-full bg-white/10 border-white/10 hover:bg-white/25 hover:-translate-y-1 hover:border-white/30"
    >
      <span className="text-white">{icon}</span>
    </button>
  );
}
