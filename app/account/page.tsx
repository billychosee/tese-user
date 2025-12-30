"use client";

import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
  FaThLarge,
  FaList,
  FaCreditCard,
  FaYoutube,
  FaListUl,
  FaCheckCircle,
  FaPlay,
  FaHome,
  FaCompass,
  FaDownload,
  FaUser,
  FaBell,
  FaHistory,
  FaCog,
  FaShoppingBag,
  FaVideo,
} from "react-icons/fa";
import SideMenu from "@/components/SideMenu";
import { useTheme } from "@/components/ThemeProvider";

const AccountProfile = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    joinDate: "January 2024",
    lastLogin: "2 hours ago",
    notifications: true,
    emailNotifications: true,
    pushNotifications: false,
  };

  // Mock transaction history
  const transactions = [
    {
      id: 1,
      date: "2024-12-15",
      description: "Monthly Premium Subscription",
      amount: "R149.99",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-12-10",
      description: "Video Purchase: Loetoeng Kasarung",
      amount: "R29.99",
      status: "Completed",
    },
    {
      id: 3,
      date: "2024-12-01",
      description: "Monthly Premium Subscription",
      amount: "R149.99",
      status: "Completed",
    },
  ];

  // Mock recently played media
  const recentlyPlayed = [
    {
      id: 1,
      title: "Loetoeng Kasarung",
      channel: "Animax Studios",
      duration: "105 min",
      watched: "2 hours ago",
      img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400",
    },
    {
      id: 2,
      title: "Neon Nights",
      channel: "Cyber Junkies",
      duration: "12 min",
      watched: "4 hours ago",
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400",
    },
  ];

  // Mock purchased media
  const purchasedMedia = [
    {
      id: 1,
      title: "Gajah Langka",
      channel: "Nature Lens",
      duration: "80 min",
      price: "R29.99",
      purchased: "December 10, 2024",
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400",
    },
    {
      id: 2,
      title: "The Fast Track",
      channel: "Action Central",
      duration: "45 min",
      price: "R39.99",
      purchased: "November 28, 2024",
      img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 font-sans p-4 lg:p-12 relative overflow-hidden ${
        isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f0f4f7] text-slate-800"
      }`}
    >
      {/* Background Gradients - Strictly Red and Green Fades */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-all duration-1000 opacity-20 ${
            isDarkMode ? "bg-red-900/40" : "bg-red-200/50"
          }`}
        />
        <div
          className={`absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-all duration-1000 opacity-20 ${
            isDarkMode ? "bg-green-900/30" : "bg-green-200/50"
          }`}
        />
      </div>

      {/* Sidebar Overlay */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        isDarkMode={isDarkMode}
        activePage="account"
      />

      <main
        className={`relative z-10 max-w-7xl mx-auto backdrop-blur-3xl rounded-[3rem] border shadow-2xl p-6 lg:p-10 transition-all duration-700 ${
          isDarkMode
            ? "bg-white/5 border-white/10"
            : "bg-white/40 border-white/60 shadow-xl shadow-slate-200/50"
        }`}
      >
        {/* Navbar */}
        <nav className="flex items-center justify-between gap-6 mb-8">
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
            <div className="hidden text-xl italic font-black tracking-tighter text-red-600 sm:block">
              TESE
            </div>
          </div>

          <div className="relative flex-1 max-w-xl">
            <FaSearch
              className={`absolute -translate-y-1/2 left-4 top-1/2 ${
                isDarkMode ? "opacity-30" : "opacity-50 text-slate-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-3 pl-12 pr-4 text-sm transition-all border outline-none rounded-2xl ${
                isDarkMode
                  ? "bg-white/5 border-white/10 text-white placeholder-white/20"
                  : "bg-slate-500/10 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
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
            <div className="relative">
              <img
                src={user.avatar}
                className="w-10 h-10 rounded-full border-2 border-red-500 p-0.5"
                alt="user"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </nav>

        {/* User Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-red-600">{user.name}</h1>
              <p className="text-slate-500">{user.email}</p>
              <p className="text-sm text-slate-400">
                Member since {user.joinDate} • Last active: {user.lastLogin}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="flex gap-4">
                <button className="px-6 py-3 font-bold text-white transition-all bg-red-600 shadow-lg rounded-2xl hover:scale-105">
                  Edit Profile
                </button>
                <button className="px-6 py-3 font-bold transition-all border rounded-2xl hover:scale-105 border-slate-300 text-slate-600">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details Content */}
        <div
          className={`overflow-hidden border rounded-3xl ${
            isDarkMode
              ? "border-white/10 bg-white/5"
              : "border-white/60 bg-white/40"
          }`}
        >
          <div className="p-8">
            <h2 className="mb-6 text-2xl font-black text-red-600">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-500">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-slate-500/10 border-slate-200 text-slate-800"
                  }`}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-500">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-slate-500/10 border-slate-200 text-slate-800"
                  }`}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-500">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-slate-500/10 border-slate-200 text-slate-800"
                  }`}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-500">
                  Country
                </label>
                <select
                  className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-slate-500/10 border-slate-200 text-slate-800"
                  }`}
                >
                  <option>South Africa</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button className="px-8 py-3 font-bold text-white transition-all bg-red-600 shadow-lg rounded-2xl hover:scale-105">
                Save Changes
              </button>
              <button className="px-8 py-3 font-bold transition-all border rounded-2xl hover:scale-105 border-slate-300 text-slate-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AccountProfile;
