"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaDownload,
  FaBell,
  FaCog,
  FaHistory,
  FaPlay,
  FaShoppingBag,
  FaChevronRight,
  FaChevronDown,
  FaVideo,
  FaCalendar,
  FaTag,
  FaCreditCard,
  FaClock,
  FaEye,
} from "react-icons/fa";
import { useColorClasses } from "@/lib/colorUtils";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasDetails: boolean;
  details?: React.ReactNode;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { gradients, bg, border } = useColorClasses();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    media: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems: MenuItem[] = [
    {
      id: "personal-details",
      label: "Personal Details",
      icon: <FaUser size={20} />,
      hasDetails: true,
      details: (
        <div className="space-y-4">
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Account Information</h4>
            <div className="space-y-2 text-sm text-zimbabwe-white/80">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="font-medium">Demo User</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-medium">demo@example.com</span>
              </div>
              <div className="flex justify-between">
                <span>Member Since:</span>
                <span className="font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Subscription:</span>
                <span className="font-medium text-zimbabwe-green">Free</span>
              </div>
            </div>
          </div>
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Profile Settings</h4>
            <div className="space-y-2">
              <button
                className={`w-full text-left p-2 rounded ${bg.green} ${border.green} hover:${bg.green}`}
              >
                Edit Profile
              </button>
              <button
                className={`w-full text-left p-2 rounded ${bg.green} ${border.green} hover:${bg.green}`}
              >
                Change Password
              </button>
              <button
                className={`w-full text-left p-2 rounded ${bg.green} ${border.green} hover:${bg.green}`}
              >
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "downloads",
      label: "Downloads",
      icon: <FaDownload size={20} />,
      hasDetails: true,
      details: (
        <div className="space-y-4">
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Downloaded Videos</h4>
            <div className="space-y-3">
              {[
                { title: "The Adventure of Blue Sword", progress: 100 },
                { title: "Recalling the journey of Dol", progress: 75 },
                { title: "Sports Highlights Compilation", progress: 50 },
              ].map((video, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded bg-zimbabwe-black/40"
                >
                  <FaVideo size={16} className="text-zimbabwe-white/60" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{video.title}</div>
                    <div className="w-full h-2 mt-1 rounded-full bg-zimbabwe-white/20">
                      <div
                        className="h-2 rounded-full bg-zimbabwe-green"
                        style={{ width: `${video.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-zimbabwe-white/60">
                    {video.progress}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Download Settings</h4>
            <div className="space-y-2 text-sm text-zimbabwe-white/80">
              <div className="flex items-center justify-between">
                <span>Auto-download on WiFi</span>
                <span className="px-2 py-1 text-xs rounded bg-zimbabwe-green/20 text-zimbabwe-green">
                  ON
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Download Quality</span>
                <span className="font-medium">1080p</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Storage Used</span>
                <span className="font-medium">2.3 GB / 10 GB</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <FaBell size={20} />,
      hasDetails: true,
      details: (
        <div className="space-y-4">
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Recent Notifications</h4>
            <div className="space-y-3">
              {[
                {
                  title: "New video available",
                  time: "2 hours ago",
                  type: "video",
                },
                {
                  title: "Subscription renewal",
                  time: "1 day ago",
                  type: "payment",
                },
                {
                  title: "Download completed",
                  time: "3 days ago",
                  type: "download",
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded bg-zimbabwe-black/40"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      notification.type === "video"
                        ? "bg-zimbabwe-yellow"
                        : notification.type === "payment"
                        ? "bg-zimbabwe-green"
                        : "bg-zimbabwe-red"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {notification.title}
                    </div>
                    <div className="text-xs text-zimbabwe-white/60">
                      {notification.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Notification Settings</h4>
            <div className="space-y-2 text-sm text-zimbabwe-white/80">
              <div className="flex items-center justify-between">
                <span>Email notifications</span>
                <span className="px-2 py-1 text-xs rounded bg-zimbabwe-green/20 text-zimbabwe-green">
                  ON
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Push notifications</span>
                <span className="px-2 py-1 text-xs rounded bg-zimbabwe-green/20 text-zimbabwe-green">
                  ON
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Newsletter</span>
                <span className="px-2 py-1 text-xs rounded bg-zimbabwe-red/20 text-zimbabwe-red">
                  OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "account-settings",
      label: "Account Settings",
      icon: <FaCog size={20} />,
      hasDetails: true,
      details: (
        <div className="space-y-4">
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Account Management</h4>
            <div className="space-y-2">
              <button
                className={`w-full text-left p-2 rounded ${bg.green} ${border.green} hover:${bg.green}`}
              >
                Manage Subscription
              </button>
              <button
                className={`w-full text-left p-2 rounded ${bg.green} ${border.green} hover:${bg.green}`}
              >
                Payment Methods
              </button>
              <button
                className={`w-full text-left p-2 rounded ${bg.green} ${border.green} hover:${bg.green}`}
              >
                Security Settings
              </button>
              <button
                className={`w-full text-left p-2 rounded ${bg.green} ${border.green} hover:${bg.green}`}
              >
                Help & Support
              </button>
            </div>
          </div>
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Preferences</h4>
            <div className="space-y-2 text-sm text-zimbabwe-white/80">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <span className="px-2 py-1 text-xs rounded bg-zimbabwe-green/20 text-zimbabwe-green">
                  ON
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Auto-play</span>
                <span className="px-2 py-1 text-xs rounded bg-zimbabwe-green/20 text-zimbabwe-green">
                  ON
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtitles</span>
                <span className="px-2 py-1 text-xs rounded bg-zimbabwe-red/20 text-zimbabwe-red">
                  OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "transaction-history",
      label: "Transaction History",
      icon: <FaHistory size={20} />,
      hasDetails: true,
      details: (
        <div className="space-y-4">
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Recent Transactions</h4>
            <div className="space-y-3">
              {[
                {
                  description: "Subscription renewal",
                  amount: "R49.00",
                  date: "Dec 1, 2024",
                  type: "debit",
                },
                {
                  description: "Video purchase: Blue Sword",
                  amount: "R25.00",
                  date: "Nov 25, 2024",
                  type: "debit",
                },
                {
                  description: "Refund: Technical issue",
                  amount: "R15.00",
                  date: "Nov 20, 2024",
                  type: "credit",
                },
                {
                  description: "Subscription renewal",
                  amount: "R49.00",
                  date: "Nov 1, 2024",
                  type: "debit",
                },
              ].map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded bg-zimbabwe-black/40"
                >
                  <div className="flex items-center gap-3">
                    <FaCreditCard
                      size={16}
                      className="text-zimbabwe-white/60"
                    />
                    <div>
                      <div className="text-sm font-medium">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-zimbabwe-white/60">
                        {transaction.date}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${
                      transaction.type === "debit"
                        ? "text-zimbabwe-red"
                        : "text-zimbabwe-green"
                    }`}
                  >
                    {transaction.type === "debit" ? "-" : "+"}R
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Billing Summary</h4>
            <div className="space-y-2 text-sm text-zimbabwe-white/80">
              <div className="flex justify-between">
                <span>Total spent this month:</span>
                <span className="font-medium text-zimbabwe-red">R74.00</span>
              </div>
              <div className="flex justify-between">
                <span>Subscription status:</span>
                <span className="font-medium text-zimbabwe-green">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Next billing date:</span>
                <span className="font-medium">Jan 1, 2025</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "recently-played",
      label: "Recently Played Media",
      icon: <FaPlay size={20} />,
      hasDetails: true,
      details: (
        <div className="space-y-4">
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Recently Played</h4>
            <div className="space-y-3">
              {[
                {
                  title: "The Adventure of Blue Sword",
                  channel: "Action Films",
                  time: "2 hours ago",
                },
                {
                  title: "Recalling the journey of Dol",
                  channel: "Drama Series",
                  time: "4 hours ago",
                },
                {
                  title: "Sports Highlights Compilation",
                  channel: "Sports Channel",
                  time: "1 day ago",
                },
                {
                  title: "Church Service Live",
                  channel: "Faith Channel",
                  time: "2 days ago",
                },
              ].map((video, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded bg-zimbabwe-black/40"
                >
                  <div className="flex items-center justify-center w-12 h-8 rounded bg-zimbabwe-white/20">
                    <FaPlay size={12} className="text-zimbabwe-white/60" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{video.title}</div>
                    <div className="text-xs text-zimbabwe-white/60">
                      {video.channel}
                    </div>
                    <div className="mt-1 text-xs text-zimbabwe-white/40">
                      Watched {video.time}
                    </div>
                  </div>
                  <FaEye size={16} className="text-zimbabwe-white/60" />
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Continue Watching</h4>
            <div className="space-y-2 text-sm text-zimbabwe-white/80">
              <div className="flex items-center justify-between p-2 rounded bg-zimbabwe-black/40">
                <span>The Adventure of Blue Sword</span>
                <span className="text-zimbabwe-yellow">75% completed</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zimbabwe-black/40">
                <span>Recalling the journey of Dol</span>
                <span className="text-zimbabwe-yellow">45% completed</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "purchased-media",
      label: "Purchased Media",
      icon: <FaShoppingBag size={20} />,
      hasDetails: true,
      details: (
        <div className="space-y-4">
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Your Library</h4>
            <div className="space-y-3">
              {[
                {
                  title: "The Adventure of Blue Sword",
                  price: "R25.00",
                  date: "Nov 25, 2024",
                  category: "Action",
                },
                {
                  title: "Recalling the journey of Dol",
                  price: "R20.00",
                  date: "Nov 20, 2024",
                  category: "Drama",
                },
                {
                  title: "Sports Highlights Compilation",
                  price: "R15.00",
                  date: "Nov 15, 2024",
                  category: "Sports",
                },
              ].map((video, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded bg-zimbabwe-black/40"
                >
                  <div className="flex items-center justify-center w-12 h-8 rounded bg-zimbabwe-green/20">
                    <FaTag size={12} className="text-zimbabwe-green" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{video.title}</div>
                    <div className="flex gap-2 text-xs text-zimbabwe-white/60">
                      <span>{video.category}</span>
                      <span>•</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-zimbabwe-green">
                      R{video.price}
                    </div>
                    <div className="text-xs text-zimbabwe-white/60">Owned</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
            <h4 className="mb-3 font-semibold">Library Stats</h4>
            <div className="space-y-2 text-sm text-zimbabwe-white/80">
              <div className="flex justify-between">
                <span>Total videos purchased:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Total spent:</span>
                <span className="font-medium text-zimbabwe-green">R60.00</span>
              </div>
              <div className="flex justify-between">
                <span>Available offline:</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Side Menu */}
      <div
        className={`
        fixed left-0 top-0 h-full w-80 bg-zimbabwe-black/95 backdrop-blur-xl
        border-r border-zimbabwe-white/10 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-72 lg:w-80
        rounded-r-4xl
        shadow-2xl
      `}
      >
        {/* Header */}
        <div className="p-6 border-b border-zimbabwe-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zimbabwe-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg md:hidden hover:bg-zimbabwe-white/10"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100%-80px)]">
          {/* Personal Section */}
          <div>
            <button
              onClick={() => toggleSection("personal")}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                openSections.personal ? bg.green : "hover:bg-zimbabwe-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaUser size={20} />
                <span className="font-medium">Personal</span>
              </div>
              {openSections.personal ? (
                <FaChevronDown size={16} />
              ) : (
                <FaChevronRight size={16} />
              )}
            </button>

            {openSections.personal && (
              <div className="pl-4 mt-2 space-y-2">
                {menuItems.slice(0, 4).map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Media Section */}
          <div>
            <button
              onClick={() => toggleSection("media")}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                openSections.media ? bg.green : "hover:bg-zimbabwe-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaPlay size={20} />
                <span className="font-medium">Media</span>
              </div>
              {openSections.media ? (
                <FaChevronDown size={16} />
              ) : (
                <FaChevronRight size={16} />
              )}
            </button>

            {openSections.media && (
              <div className="pl-4 mt-2 space-y-2">
                {menuItems.slice(4).map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function MenuItem({ item }: { item: MenuItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { bg, border } = useColorClasses();

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
          isExpanded ? bg.green : "hover:bg-zimbabwe-white/5"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-zimbabwe-white/60">{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </div>
        <FaChevronRight
          size={14}
          className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
        />
      </button>

      {isExpanded && item.details && (
        <div className="p-3 mt-2 ml-8 border shadow-lg rounded-2xl bg-zimbabwe-white/5 border-zimbabwe-white/10">
          {item.details}
        </div>
      )}
    </div>
  );
}
