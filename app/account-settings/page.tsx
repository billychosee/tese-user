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
  FaShieldAlt,
  FaEye,
  FaLock,
  FaKey,
} from "react-icons/fa";
import SideMenu from "@/components/SideMenu";

const AccountSettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("privacy");

  // Mock user settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    activityVisibility: "public",
    showEmail: false,
    showPhone: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: "30 minutes",
    trustedDevices: ["Chrome - Windows", "Safari - iOS"],
  });

  const tabs = [
    { id: "privacy", label: "Privacy", icon: FaEye },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "password", label: "Password", icon: FaKey },
  ];

  const handlePrivacyChange = (
    setting: keyof typeof privacySettings,
    value: any
  ) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSecurityToggle = (setting: keyof typeof securitySettings) => {
    setSecuritySettings((prev) => ({
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
              placeholder="Search settings..."
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
            Account Settings
          </h1>
          <p className="mb-6 text-slate-500">
            Manage your account privacy, security, and preferences
          </p>
          <div className="flex gap-4 pb-4 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border backdrop-blur-md transition-all text-sm font-bold whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30"
                    : isDarkMode
                    ? "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                    : "bg-slate-500/10 border-white/60 text-slate-500 hover:bg-slate-500/20"
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "privacy" && (
          <div className="space-y-8">
            <div
              className={`p-6 border rounded-2xl ${
                isDarkMode ? "border-white/10" : "border-white/60"
              }`}
            >
              <h2 className="mb-6 text-2xl font-black text-red-600">
                Privacy Settings
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-500">
                      Profile Visibility
                    </label>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) =>
                        handlePrivacyChange("profileVisibility", e.target.value)
                      }
                      className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                        isDarkMode
                          ? "bg-white/5 border-white/10 text-white"
                          : "bg-slate-500/10 border-slate-200 text-slate-800"
                      }`}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-500">
                      Activity Visibility
                    </label>
                    <select
                      value={privacySettings.activityVisibility}
                      onChange={(e) =>
                        handlePrivacyChange(
                          "activityVisibility",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                        isDarkMode
                          ? "bg-white/5 border-white/10 text-white"
                          : "bg-slate-500/10 border-slate-200 text-slate-800"
                      }`}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-bold">Show Email Address</h4>
                      <p className="text-sm text-slate-500">
                        Allow other users to see your email address
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacySettings.showEmail}
                      onChange={() =>
                        handlePrivacyChange(
                          "showEmail",
                          !privacySettings.showEmail
                        )
                      }
                      className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-bold">Show Phone Number</h4>
                      <p className="text-sm text-slate-500">
                        Allow other users to see your phone number
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacySettings.showPhone}
                      onChange={() =>
                        handlePrivacyChange(
                          "showPhone",
                          !privacySettings.showPhone
                        )
                      }
                      className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 font-bold text-white transition-all bg-red-600 shadow-lg rounded-2xl hover:scale-105">
                Save Changes
              </button>
              <button className="px-8 py-3 font-bold transition-all border rounded-2xl hover:scale-105 border-slate-300 text-slate-600">
                Reset to Default
              </button>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-8">
            <div
              className={`p-6 border rounded-2xl ${
                isDarkMode ? "border-white/10" : "border-white/60"
              }`}
            >
              <h2 className="mb-6 text-2xl font-black text-red-600">
                Security Settings
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-bold">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={() => handleSecurityToggle("twoFactorAuth")}
                    className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-bold">Login Notifications</h4>
                    <p className="text-sm text-slate-500">
                      Get notified when your account is accessed from a new
                      device
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={securitySettings.loginNotifications}
                    onChange={() => handleSecurityToggle("loginNotifications")}
                    className="w-5 h-5 text-red-600 bg-white rounded border-slate-300 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-500">
                    Session Timeout
                  </label>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings((prev) => ({
                        ...prev,
                        sessionTimeout: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                      isDarkMode
                        ? "bg-white/5 border-white/10 text-white"
                        : "bg-slate-500/10 border-slate-200 text-slate-800"
                    }`}
                  >
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div>
                  <h3 className="mb-4 font-bold">Trusted Devices</h3>
                  <div className="space-y-3">
                    {securitySettings.trustedDevices.map((device, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <span>{device}</span>
                        <span className="text-sm font-bold text-green-600">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 font-bold text-white transition-all bg-red-600 shadow-lg rounded-2xl hover:scale-105">
                Save Changes
              </button>
              <button className="px-8 py-3 font-bold transition-all border rounded-2xl hover:scale-105 border-slate-300 text-slate-600">
                Reset to Default
              </button>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="space-y-8">
            <div
              className={`p-6 border rounded-2xl ${
                isDarkMode ? "border-white/10" : "border-white/60"
              }`}
            >
              <h2 className="mb-6 text-2xl font-black text-red-600">
                Change Password
              </h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-500">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                      isDarkMode
                        ? "bg-white/5 border-white/10 text-white"
                        : "bg-slate-500/10 border-slate-200 text-slate-800"
                    }`}
                    placeholder="Enter your current password"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-500">
                    New Password
                  </label>
                  <input
                    type="password"
                    className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                      isDarkMode
                        ? "bg-white/5 border-white/10 text-white"
                        : "bg-slate-500/10 border-slate-200 text-slate-800"
                    }`}
                    placeholder="Enter your new password"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-500">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className={`w-full px-4 py-3 text-sm transition-all border rounded-xl ${
                      isDarkMode
                        ? "bg-white/5 border-white/10 text-white"
                        : "bg-slate-500/10 border-slate-200 text-slate-800"
                    }`}
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>
              <div className="p-4 mt-6 border bg-slate-500/10 border-slate-200 rounded-xl">
                <h4 className="mb-2 font-bold">Password Requirements:</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 font-bold text-white transition-all bg-red-600 shadow-lg rounded-2xl hover:scale-105">
                Update Password
              </button>
              <button className="px-8 py-3 font-bold transition-all border rounded-2xl hover:scale-105 border-slate-300 text-slate-600">
                Cancel
              </button>
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

export default AccountSettingsPage;
