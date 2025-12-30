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
  FaEnvelope,
  FaMobile,
  FaNewspaper,
} from "react-icons/fa";
import SideMenu from "@/components/SideMenu";

const NotificationsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");

  // Mock user notification preferences
  const [userSettings, setUserSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
    contentUpdates: true,
    promotional: false,
  });

  // Mock notification history
  const notifications = [
    {
      id: 1,
      type: "content",
      title: "New Episode Available",
      message: "The latest episode of your favorite show is now available",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Successful",
      message: "Your monthly subscription has been renewed",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      type: "system",
      title: "App Update Available",
      message: "A new version of the app is available with exciting features",
      time: "3 days ago",
      read: true,
    },
    {
      id: 4,
      type: "content",
      title: "Recommended for You",
      message: "Based on your viewing history, we think you'll love this",
      time: "5 days ago",
      read: false,
    },
  ];

  const handleToggle = (setting: keyof typeof userSettings) => {
    setUserSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

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
              placeholder="Search notifications..."
              className={`w-full py-3 pl-12 pr-4 text-sm transition-all border outline-none rounded-2xl ${
                isDarkMode
                  ? "bg-white/5 border-white/10 text-white placeholder-white/20"
                  : "bg-slate-500/10 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
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
          <h1 className="mb-2 text-4xl font-black text-red-600">
            Notifications
          </h1>
          <p className="mb-6 text-slate-500">
            Manage your notification preferences and view your notification
            history
          </p>
          <div className="flex gap-4 pb-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-3 rounded-xl border backdrop-blur-md transition-all text-sm font-bold whitespace-nowrap ${
                activeTab === "settings"
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30"
                  : isDarkMode
                  ? "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                  : "bg-slate-500/10 border-white/60 text-slate-500 hover:bg-slate-500/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaCog />
                Settings
              </div>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 rounded-xl border backdrop-blur-md transition-all text-sm font-bold whitespace-nowrap ${
                activeTab === "history"
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30"
                  : isDarkMode
                  ? "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                  : "bg-slate-500/10 border-white/60 text-slate-500 hover:bg-slate-500/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaHistory />
                History
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "settings" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div
                className={`p-6 border rounded-2xl ${
                  isDarkMode ? "border-white/10" : "border-white/60"
                }`}
              >
                <h3 className="mb-4 text-lg font-black text-red-600">
                  Email Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-bold">General Notifications</h4>
                      <p className="text-sm text-slate-500">
                        Receive updates about your account and content
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={userSettings.emailNotifications}
                      onChange={() => handleToggle("emailNotifications")}
                      className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-bold">Content Updates</h4>
                      <p className="text-sm text-slate-500">
                        Get notified when new content is available
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={userSettings.contentUpdates}
                      onChange={() => handleToggle("contentUpdates")}
                      className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-bold">Newsletter</h4>
                      <p className="text-sm text-slate-500">
                        Subscribe to our weekly newsletter
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={userSettings.newsletter}
                      onChange={() => handleToggle("newsletter")}
                      className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`p-6 border rounded-2xl ${
                  isDarkMode ? "border-white/10" : "border-white/60"
                }`}
              >
                <h3 className="mb-4 text-lg font-black text-red-600">
                  Push Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-bold">Mobile Notifications</h4>
                      <p className="text-sm text-slate-500">
                        Get notified about new content and updates
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={userSettings.pushNotifications}
                      onChange={() => handleToggle("pushNotifications")}
                      className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-bold">Promotional Offers</h4>
                      <p className="text-sm text-slate-500">
                        Receive special offers and promotions
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={userSettings.promotional}
                      onChange={() => handleToggle("promotional")}
                      className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 font-bold text-white transition-all bg-red-600 shadow-lg rounded-2xl hover:scale-105">
                Save Settings
              </button>
              <button className="px-8 py-3 font-bold transition-all border rounded-2xl hover:scale-105 border-slate-300 text-slate-600">
                Reset to Default
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`overflow-hidden border rounded-3xl ${
              isDarkMode
                ? "border-white/10 bg-white/5"
                : "border-white/60 bg-white/40"
            }`}
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-black text-red-600">
                Notification History
              </h2>
              <p className="text-slate-500">Recent notifications and updates</p>
            </div>
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 ${!notification.read ? "bg-red-500/5" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          notification.type === "content"
                            ? "bg-blue-500/20 text-blue-600"
                            : notification.type === "payment"
                            ? "bg-green-500/20 text-green-600"
                            : "bg-yellow-500/20 text-yellow-600"
                        }`}
                      >
                        {notification.type === "content" ? (
                          <FaPlay />
                        ) : notification.type === "payment" ? (
                          <FaCreditCard />
                        ) : (
                          <FaBell />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">
                          {notification.title}
                        </h3>
                        <p
                          className={`mt-1 ${
                            isDarkMode ? "text-white/70" : "text-slate-600"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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

export default NotificationsPage;
