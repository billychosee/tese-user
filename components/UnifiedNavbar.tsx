"use client";

import React, { useState } from "react";
import {
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaThLarge,
  FaList,
  FaHome,
  FaCompass,
  FaDownload,
  FaCreditCard,
  FaYoutube,
  FaListUl,
  FaCheckCircle,
  FaPlay,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface UnifiedNavbarProps {
  user?: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export default function UnifiedNavbar({
  user,
  onLogout,
  isDarkMode = false,
  onThemeToggle,
}: UnifiedNavbarProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout?.();
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-500 border-b ${
        isDarkMode
          ? "bg-white/5 border-white/10"
          : "bg-white/40 border-white/60 shadow-xl shadow-slate-200/50"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setIsSideMenuOpen(true)}
              className={`p-3 transition-all border rounded-2xl shadow-sm ${
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  : "bg-slate-500/10 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <FaBars size={18} />
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-3"
            >
              {(() => {
                const logoSrc = isDarkMode
                  ? "/Tese-Dark-logo.png"
                  : "/Tese-Light-Logo.png";
                return (
                  <img src={logoSrc} alt="TESE Logo" className="w-12 h-12" />
                );
              })()}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <form onSubmit={handleSearch}>
              <FaSearch
                className={`absolute -translate-y-1/2 left-4 top-1/2 ${
                  isDarkMode ? "opacity-30" : "opacity-50 text-slate-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3 pl-12 pr-4 text-sm transition-all border outline-none rounded-2xl ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 text-white placeholder-white/20"
                    : "bg-slate-500/10 border-slate-200 text-slate-800 placeholder-slate-400"
                }`}
              />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onThemeToggle || (() => {})}
              className={`p-3 transition-transform border rounded-full hover:scale-110 ${
                isDarkMode
                  ? "bg-white/10 border-white/20"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-slate-600" />
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span
                  className={`hidden text-sm ${
                    isDarkMode ? "text-white/60" : "text-slate-600"
                  }`}
                >
                  Welcome, {user.name}
                </span>
                <div className="relative">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    className="w-10 h-10 rounded-full border-2 border-red-500 p-0.5"
                    alt="user"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                    isDarkMode
                      ? "text-white hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push("/")}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                    isDarkMode
                      ? "text-white hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push("/")}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                    isDarkMode
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
