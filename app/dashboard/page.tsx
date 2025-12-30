"use client";

import React, { useState, useEffect, useMemo } from "react";
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
} from "react-icons/fa";
import SideMenu from "@/components/SideMenu";
import { useTheme } from "@/components/ThemeProvider";

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const allVideos = [
    {
      id: 1,
      title: "Loetoeng Kasarung",
      rating: 7.8,
      year: 2023,
      category: "Animation",
      channel: "Animax Studios",
      duration: "105 min",
      isPaid: false,
      img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400",
    },
    {
      id: 2,
      title: "Gajah Langka",
      rating: 6.0,
      year: 2023,
      category: "Documentary",
      channel: "Nature Lens",
      duration: "80 min",
      isPaid: true,
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400",
    },
    {
      id: 3,
      title: "Neon Nights",
      rating: 8.5,
      year: 2024,
      category: "Sci-Fi",
      channel: "Cyber Junkies",
      duration: "12 min",
      isPaid: false,
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400",
    },
    {
      id: 4,
      title: "The Fast Track",
      rating: 7.2,
      year: 2024,
      category: "Action",
      channel: "Action Central",
      duration: "45 min",
      isPaid: true,
      img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    },
    {
      id: 5,
      title: "Cooking Masterclass",
      rating: 8.1,
      year: 2024,
      category: "Lifestyle",
      channel: "Chef's Kitchen",
      duration: "30 min",
      isPaid: false,
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    },
    {
      id: 6,
      title: "Tech Review 2024",
      rating: 7.9,
      year: 2024,
      category: "Technology",
      channel: "Tech Talk",
      duration: "25 min",
      isPaid: false,
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    },
    {
      id: 7,
      title: "Fitness Motivation",
      rating: 8.3,
      year: 2024,
      category: "Lifestyle",
      channel: "Fit Life",
      duration: "20 min",
      isPaid: false,
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    },
    {
      id: 8,
      title: "Music Production Tips",
      rating: 7.7,
      year: 2024,
      category: "Music",
      channel: "Sound Studio",
      duration: "40 min",
      isPaid: true,
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
    },
  ];

  const carouselClips = allVideos.slice(0, 3);

  const filteredVideos = useMemo(() => {
    return allVideos.filter((v) => {
      const match = v.title.toLowerCase().includes(searchQuery.toLowerCase());
      return (
        match && (selectedCategory === "All" || v.category === selectedCategory)
      );
    });
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const timer = setInterval(
      () => setCarouselIndex((p) => (p + 1) % carouselClips.length),
      5000
    );
    return () => clearInterval(timer);
  }, [carouselClips.length]);

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
        activePage="dashboard"
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
            <div className="hidden sm:block">
              {(() => {
                const logoSrc = isDarkMode
                  ? "/Tese-Dark-logo.png"
                  : "/Tese-Light-Logo.png";
                return <img src={logoSrc} alt="TESE Logo" className={`h-14`} />;
              })()}
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
              placeholder="Search content..."
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
            <div className="relative group">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                className="w-10 h-10 rounded-full border-2 border-red-500 p-0.5 cursor-pointer"
                alt="user"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              <div className="absolute right-0 z-50 hidden w-48 mt-2 bg-white border shadow-xl rounded-xl border-white/20 group-hover:block">
                <div className="p-4">
                  <p className="font-bold text-slate-800">Sarah Johnson</p>
                  <p className="text-sm text-slate-500">sarah@example.com</p>
                </div>
                <div className="border-t border-slate-200">
                  <a
                    href="/account"
                    className="block px-4 py-3 text-sm font-bold text-slate-700 hover:bg-red-500/10"
                  >
                    Account Profile
                  </a>
                  <button className="w-full px-4 py-3 text-sm font-bold text-left text-slate-700 hover:bg-red-500/10">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Carousel */}
        <section className="relative w-full h-80 lg:h-112.5 rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl border border-white/10">
          <div
            className="absolute inset-0 flex transition-transform duration-1000"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {carouselClips.map((clip) => (
              <div key={clip.id} className="relative h-full min-w-full">
                <img
                  src={clip.img}
                  className="object-cover w-full h-full"
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col justify-center p-8 bg-linear-to-r from-black/90 via-black/40 to-transparent lg:p-20">
                  <h2 className="max-w-2xl mb-8 text-4xl font-black text-white lg:text-7xl">
                    {clip.title}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className={`flex items-center gap-3 px-8 py-4 font-black transition-all rounded-2xl shadow-lg hover:scale-105 ${
                        clip.isPaid
                          ? "bg-red-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {clip.isPaid ? (
                        <>
                          <FaCreditCard /> Pay & Watch
                        </>
                      ) : (
                        <>
                          <FaPlay /> Watch Now
                        </>
                      )}
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 font-black text-white transition-all border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl hover:bg-white/20">
                      <FaDownload /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Suggested for You Section */}
        <div className="mb-12">
          <h3 className="flex items-center gap-3 mb-6 text-xl font-black text-yellow-500">
            <span className="w-2 h-8 bg-red-600 rounded-full"></span>
            Suggested for You
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allVideos.slice(0, 4).map((video) => (
              <div key={video.id} className="cursor-pointer group">
                <div
                  className={`relative mb-4 overflow-hidden border shadow-xl aspect-video rounded-3xl transition-all duration-500 ${
                    isDarkMode ? "border-white/10" : "border-white/60"
                  }`}
                >
                  <img
                    src={video.img}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black/40">
                    <div className="flex items-center justify-center text-white border rounded-full shadow-2xl w-14 h-14 bg-red-600/80 backdrop-blur-xl border-white/40">
                      <FaPlay className="ml-1" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded-lg text-[10px] font-bold text-white">
                    {video.duration}
                  </div>
                  {video.isPaid && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg">
                      PAID
                    </div>
                  )}
                </div>
                <h4
                  className={`mb-1 text-sm font-bold truncate ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {video.title}
                </h4>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] opacity-60 font-medium">
                    {video.channel}
                  </p>
                  <p className="text-[10px] text-yellow-500 font-bold">
                    ★ {video.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="flex items-center gap-3 mb-6 text-xl font-black text-yellow-500">
            <span className="w-2 h-8 bg-red-600 rounded-full"></span>
            Featured
          </h3>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
              {["All", "Animation", "Action", "Documentary", "Sci-Fi", "Lifestyle", "Technology", "Music"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl border backdrop-blur-md transition-all text-xs font-bold whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30"
                        : isDarkMode
                        ? "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                        : "bg-slate-500/10 border-white/60 text-slate-500 hover:bg-slate-500/20"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
            <div
              className={`flex p-1 border rounded-xl backdrop-blur-sm ${
                isDarkMode
                  ? "bg-black/20 border-white/10"
                  : "bg-slate-500/10 border-white/60"
              }`}
            >
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "card" ? "bg-red-600 text-white" : "opacity-30"
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "table" ? "bg-red-600 text-white" : "opacity-30"
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredVideos.map((video) => (
              <div key={video.id} className="cursor-pointer group">
                <div
                  className={`relative mb-4 overflow-hidden border shadow-xl aspect-video rounded-3xl transition-all duration-500 ${
                    isDarkMode ? "border-white/10" : "border-white/60"
                  }`}
                >
                  <img
                    src={video.img}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black/40">
                    <div className="flex items-center justify-center text-white border rounded-full shadow-2xl w-14 h-14 bg-red-600/80 backdrop-blur-xl border-white/40">
                      <FaPlay className="ml-1" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded-lg text-[10px] font-bold text-white">
                    {video.duration}
                  </div>
                  {video.isPaid && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg">
                      PAID
                    </div>
                  )}
                </div>
                <h4
                  className={`mb-1 text-sm font-bold truncate ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {video.title}
                </h4>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] opacity-60 font-medium">
                    {video.channel}
                  </p>
                  <p className="text-[10px] text-yellow-500 font-bold">
                    ★ {video.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`overflow-hidden border rounded-3xl ${
              isDarkMode
                ? "border-white/10 bg-white/5"
                : "border-white/60 bg-white/40"
            }`}
          >
            <table className="w-full text-sm text-left">
              <thead
                className={`text-[10px] uppercase tracking-widest ${
                  isDarkMode
                    ? "bg-white/5 text-white/30"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <tr>
                  <th className="px-8 py-5">Content</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDarkMode ? "divide-white/5" : "divide-slate-200/50"
                }`}
              >
                {filteredVideos.map((video) => (
                  <tr
                    key={video.id}
                    className="transition-all hover:bg-red-500/5 group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-5">
                        <div className="relative h-16 overflow-hidden border shrink-0 w-28 rounded-xl border-white/20">
                          <img
                            src={video.img}
                            className="object-cover w-full h-full transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/40 group-hover:opacity-100">
                            <div className="flex items-center justify-center w-8 h-8 text-white bg-red-600 rounded-full">
                              <FaPlay size={10} className="ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`font-bold block text-base ${
                              isDarkMode ? "text-white" : "text-slate-700"
                            }`}
                          >
                            {video.title}
                          </span>
                          <span className="text-[10px] opacity-50 uppercase">
                            {video.channel} •{" "}
                            <span className="text-yellow-500">
                              ★ {video.rating}
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-[10px] px-2 py-1 rounded-md font-bold ${
                          video.isPaid
                            ? "bg-red-500/20 text-red-600"
                            : "bg-green-500/20 text-green-600"
                        }`}
                      >
                        {video.isPaid ? "PAID" : "FREE"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${
                          video.isPaid
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {video.isPaid ? "PAY & WATCH" : "WATCH NOW"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

export default Dashboard;
