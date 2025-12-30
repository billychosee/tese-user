"use client";

import { useState } from "react";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { useColorClasses } from "../lib/colorUtils";
import SideMenu from "./SideMenu";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { primary, bg, border, gradients } = useColorClasses();
  const { theme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout?.();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-200 border-b bg-zimbabwe-grey-charcoal border-zimbabwe-white/10">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center space-x-3"
            >
              <img
                src={
                  theme === "dark"
                    ? "/Tese-Dark-logo.png"
                    : "/Tese-Light-Logo.png"
                }
                alt="TESE Logo"
                className="w-12 h-12"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            <button
              onClick={() => router.push("/dashboard")}
              className={`transition-colors text-zimbabwe-white hover:${primary.yellow}`}
            >
              Home
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className={`transition-colors text-zimbabwe-white hover:${primary.yellow}`}
            >
              Categories
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className={`transition-colors text-zimbabwe-white hover:${primary.yellow}`}
            >
              Trending
            </button>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search videos..."
                className={`w-64 py-2 pl-10 pr-4 border rounded-lg text-zimbabwe-white placeholder-zimbabwe-white/60 bg-zimbabwe-white/10 ${border.green} focus:ring-2 focus:ring-zimbabwe-yellow focus:border-transparent`}
              />
              <FaSearch
                className={`absolute left-3 top-2.5 text-zimbabwe-white/60`}
                size={20}
              />
            </div>

            {/* User Actions */}
            <div className="items-center hidden space-x-4 md:flex">
              {user ? (
                <>
                  <span className="text-sm text-zimbabwe-white/60">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className={`p-2 transition-colors text-zimbabwe-white/60 hover:text-zimbabwe-white`}
                  >
                    <FaUser size={20} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`p-2 transition-colors text-zimbabwe-white/60 hover:text-zimbabwe-white`}
                  >
                    <FaSignOutAlt size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/")}
                    className={`px-4 py-2 transition-colors text-zimbabwe-white hover:${primary.yellow}`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className={`px-4 py-2 transition-colors rounded-lg text-zimbabwe-white ${bg.red} hover:${bg.green}`}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors text-zimbabwe-white/60 md:hidden hover:text-zimbabwe-white`}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Side menu (mobile & desktop) */}
        <SideMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          isDarkMode={theme === "dark"}
        />
      </div>
    </nav>
  );
}
