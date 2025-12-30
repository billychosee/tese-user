"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import {
  FaTimes,
  FaHome,
  FaCompass,
  FaYoutube,
  FaDownload,
  FaUser,
  FaBell,
  FaCog,
  FaHistory,
  FaVideo,
  FaShoppingBag,
  FaCreditCard,
  FaEnvelope,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  activePage?: string;
}

const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  activePage = "home",
}) => {
  const { theme } = useTheme();
  const effectiveDark = theme === "dark";
  const NavItem = ({
    icon,
    label,
    href,
    active = false,
  }: {
    icon: React.ReactNode;
    label: string;
    href: string;
    active?: boolean;
  }) => (
    <a
      href={href}
      className={`flex items-center gap-4 px-6 py-2.5 rounded-2xl cursor-pointer transition-all ${
        active
          ? "bg-red-600 text-white shadow-lg"
          : effectiveDark
          ? "text-white/40 hover:bg-white/5 hover:text-white"
          : "text-slate-500 hover:bg-slate-100"
      }`}
      onClick={onClose}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </a>
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        className={`relative w-72 h-full p-8 flex flex-col transition-colors duration-500 ${
          isDarkMode
            ? "bg-[#121416]/95 text-white"
            : "bg-white/95 text-slate-800"
        } backdrop-blur-2xl border-r border-white/10`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Use brand-approved assets for light/dark modes instead of CSS invert */}
            <img
              src={
                effectiveDark ? "/Tese-Dark-logo.png" : "/Tese-Light-Logo.png"
              }
              alt="TESE Logo"
              className={`h-12`}
            />
          </div>
          <button onClick={onClose} className="opacity-60 hover:opacity-100">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <NavItem
            icon={<FaHome />}
            label="Home Feed"
            href="/"
            active={activePage === "home"}
          />
          <NavItem
            icon={<FaCompass />}
            label="Trending"
            href="/dashboard"
            active={activePage === "dashboard"}
          />
          <NavItem
            icon={<FaYoutube />}
            label="Channels"
            href="/channels"
            active={activePage === "channels"}
          />
          <NavItem
            icon={<FaDownload />}
            label="Downloads"
            href="/downloads"
            active={activePage === "downloads"}
          />
          <NavItem
            icon={<FaUser />}
            label="Account Profile"
            href="/account"
            active={activePage === "account"}
          />
          <NavItem
            icon={<FaBell />}
            label="Notifications"
            href="/notifications"
            active={activePage === "notifications"}
          />
          <NavItem
            icon={<FaCog />}
            label="Account Settings"
            href="/account-settings"
            active={activePage === "account-settings"}
          />
          <NavItem
            icon={<FaHistory />}
            label="Transaction History"
            href="/transaction-history"
            active={activePage === "transaction-history"}
          />
          <NavItem
            icon={<FaVideo />}
            label="Recently Played"
            href="/recently-played"
            active={activePage === "recently-played"}
          />
          <NavItem
            icon={<FaShoppingBag />}
            label="Purchased Media"
            href="/purchased"
            active={activePage === "purchased"}
          />
        </div>

        {/* Account Actions */}
        <div className="pt-6 mt-auto space-y-3 border-t border-white/10">
          <NavItem
            icon={<FaCreditCard />}
            label="Subscription"
            href="/subscription"
            active={false}
          />
          <NavItem
            icon={<FaEnvelope />}
            label="Support"
            href="/support"
            active={false}
          />
          <NavItem
            icon={<FaShieldAlt />}
            label="Privacy Policy"
            href="/privacy"
            active={false}
          />
          <div className="my-4 border-t border-white/10"></div>
          <NavItem
            icon={<FaSignOutAlt />}
            label="Sign Out"
            href="/logout"
            active={false}
          />
        </div>
      </aside>
    </div>
  );
};

export default SideMenu;
