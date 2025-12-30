"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Channel } from "@/types/channel";
import { User } from "@/types/user";
import { useTheme } from "@/components/ThemeProvider";
import { useSubscriptions } from "@/lib/useSubscriptions";
import SideMenu from "@/components/SideMenu";
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

export default function ChannelsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    user,
    channels,
    isLoading,
    subscribeToChannel,
    unsubscribeFromChannel,
  } = useSubscriptions();

  const handleSubscribe = async (channelId: string) => {
    subscribeToChannel(channelId);
  };

  const handleUnsubscribe = async (channelId: string) => {
    unsubscribeFromChannel(channelId);
  };

  const handleChannelClick = (channelId: string) => {
    router.push(`/channel/${channelId}`);
  };

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-400">Loading channels...</p>
        </div>
      </div>
    );
  }

  const subscribedChannels = channels.filter((c) => c.isSubscribed);
  const recommendedChannels = channels.filter((c) => !c.isSubscribed);
  const allChannels = [...subscribedChannels, ...recommendedChannels];

  const filteredChannels = allChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        activePage="channels"
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
              placeholder="Search channels..."
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
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                className="w-10 h-10 rounded-full border-2 border-red-500 p-0.5"
                alt="user"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-black text-red-600">My Channels</h1>
          <p className="mb-6 text-slate-500">
            Manage your subscriptions and discover new channels
          </p>
          <div className="flex items-center justify-between">
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
            <div className="text-sm text-slate-500">
              {channels.length} channels
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredChannels.map((channel) => (
              <div key={channel.id} className="cursor-pointer group">
                <div
                  className={`relative mb-4 overflow-hidden border shadow-xl aspect-video rounded-3xl transition-all duration-500 ${
                    isDarkMode ? "border-white/10" : "border-white/60"
                  }`}
                >
                  <img
                    src={channel.banner}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black/40">
                    <div className="flex items-center justify-center text-white border rounded-full shadow-2xl w-14 h-14 bg-red-600/80 backdrop-blur-xl border-white/40">
                      <FaPlay className="ml-1" size={20} />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg">
                    {channel.isSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
                  </div>
                </div>
                <h4
                  className={`mb-1 text-sm font-bold truncate ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {channel.name}
                </h4>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] opacity-60 font-medium">
                    {channel.subscriberCount.toLocaleString()} subscribers
                  </p>
                  <p className="text-[10px] text-green-600 font-bold">
                    {channel.videos.length} videos
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleChannelClick(channel.id)}
                    className="flex-1 px-4 py-2 font-bold text-white transition-all bg-red-600 rounded-xl hover:scale-105"
                  >
                    View Channel
                  </button>
                  {channel.isSubscribed ? (
                    <button
                      onClick={() => handleUnsubscribe(channel.id)}
                      className="px-4 py-2 font-bold transition-all border rounded-xl border-slate-300 text-slate-600 hover:bg-slate-100"
                    >
                      Unsubscribe
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(channel.id)}
                      className="px-4 py-2 font-bold transition-all border rounded-xl border-slate-300 text-slate-600 hover:bg-slate-100"
                    >
                      Subscribe
                    </button>
                  )}
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
                  <th className="px-8 py-5">Channel</th>
                  <th className="px-6 py-5">Subscribers</th>
                  <th className="px-6 py-5">Videos</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDarkMode ? "divide-white/5" : "divide-slate-200/50"
                }`}
              >
                {filteredChannels.map((channel) => (
                  <tr
                    key={channel.id}
                    className="transition-all hover:bg-red-500/5 group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-5">
                        <div className="relative h-16 overflow-hidden border shrink-0 w-28 rounded-xl border-white/20">
                          <img
                            src={channel.banner}
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
                            {channel.name}
                          </span>
                          <span className="text-[10px] opacity-50 uppercase">
                            {channel.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] text-slate-500">
                        {channel.subscriberCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] text-slate-500">
                        {channel.videos.length}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-bold ${
                        channel.isSubscribed ? "text-green-600" : "text-red-600"
                      }`}>
                        {channel.isSubscribed ? "SUBSCRIBED" : "NOT SUBSCRIBED"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleChannelClick(channel.id)}
                          className="px-4 py-2 text-sm font-bold text-white transition-all bg-red-600 rounded-xl hover:scale-105"
                        >
                          View Channel
                        </button>
                        {channel.isSubscribed ? (
                          <button
                            onClick={() => handleUnsubscribe(channel.id)}
                            className="px-4 py-2 text-sm font-bold transition-all border rounded-xl border-slate-300 text-slate-600 hover:bg-slate-100"
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSubscribe(channel.id)}
                            className="px-4 py-2 text-sm font-bold transition-all border rounded-xl border-slate-300 text-slate-600 hover:bg-slate-100"
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
function setUser(arg0: null) {
  throw new Error("Function not implemented.");
}

