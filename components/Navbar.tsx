"use client";

import { useState } from "react";
import { Search, Menu, X, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout?.();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-200 border-b bg-dark-surface border-dark-border">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center space-x-3"
            >
              <img src="/Tese-Logo.svg" alt="TESE Logo" className="w-8 h-8" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            <button
              onClick={() => router.push("/dashboard")}
              className="transition-colors text-dark-text hover:text-zimbabwe-accent"
            >
              Home
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="transition-colors text-dark-text hover:text-zimbabwe-accent"
            >
              Categories
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="transition-colors text-dark-text hover:text-zimbabwe-accent"
            >
              Trending
            </button>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-64 py-2 pl-10 pr-4 border rounded-lg text-dark-text placeholder-dark-muted bg-dark-card border-dark-border focus:ring-2 focus:ring-zimbabwe-accent focus:border-transparent"
              />
              <Search
                className="absolute left-3 top-2.5 text-dark-muted"
                size={20}
              />
            </div>

            {/* User Actions */}
            <div className="items-center hidden space-x-4 md:flex">
              {user ? (
                <>
                  <span className="text-sm text-dark-muted">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="p-2 transition-colors text-dark-muted hover:text-dark-text"
                  >
                    <User size={20} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 transition-colors text-dark-muted hover:text-dark-text"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/")}
                    className="px-4 py-2 transition-colors text-dark-text hover:text-zimbabwe-accent"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="px-4 py-2 text-white transition-colors rounded-lg bg-zimbabwe-accent-bg hover:bg-zimbabwe-secondary-bg"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors md:hidden text-dark-muted hover:text-dark-text"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="py-4 transition-colors duration-200 border-t border-dark-border">
            <div className="space-y-4">
              <button
                onClick={() => {
                  router.push("/dashboard");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left transition-colors text-dark-text hover:text-zimbabwe-accent"
              >
                Home
              </button>
              <button
                onClick={() => {
                  router.push("/dashboard");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left transition-colors text-dark-text hover:text-zimbabwe-accent"
              >
                Categories
              </button>
              <button
                onClick={() => {
                  router.push("/dashboard");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left transition-colors text-dark-text hover:text-zimbabwe-accent"
              >
                Trending
              </button>

              {user && (
                <>
                  <div className="pt-4 transition-colors duration-200 border-t border-dark-border">
                    <span className="block mb-2 text-sm text-dark-muted">
                      Account
                    </span>
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left transition-colors text-dark-text hover:text-zimbabwe-accent"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full mt-2 text-left transition-colors text-dark-text hover:text-zimbabwe-accent"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
