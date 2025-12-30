"use client";

import React, { useState, useEffect } from "react";
import {
  FaMoon,
  FaSun,
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaPlay,
  FaStar,
  FaDownload,
} from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Mock featured content for carousel
  const featuredContent = [
    {
      title: "Loetoeng Kasarung",
      description:
        "Epic animated adventure featuring traditional Indonesian folklore",
      img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
      rating: 7.8,
      category: "Animation",
    },
    {
      title: "Neon Nights",
      description: "Futuristic cyberpunk thriller set in a neon-lit metropolis",
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800",
      rating: 8.5,
      category: "Sci-Fi",
    },
    {
      title: "Gajah Langka",
      description: "Breathtaking documentary about endangered elephants",
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
      rating: 6.0,
      category: "Documentary",
    },
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setCarouselIndex((p) => (p + 1) % featuredContent.length),
      4000
    );
    return () => clearInterval(timer);
  }, [featuredContent.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (email === "demo@example.com" && password === "demo123") {
        // Simulate successful login
        localStorage.setItem("auth_token", "mock-jwt-token");
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "user-1",
            email,
            name: "Demo User",
          })
        );
        window.location.href = "/dashboard";
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 font-sans relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-slate-800"
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

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-32 h-32 rounded-full ${
            isDarkMode ? "bg-red-500/10" : "bg-red-200/30"
          } blur-xl`}
        ></div>
        <div
          className={`absolute top-40 right-10 w-24 h-24 rounded-full ${
            isDarkMode ? "bg-green-500/10" : "bg-green-200/30"
          } blur-xl`}
        ></div>
        <div
          className={`absolute bottom-20 left-1/3 w-40 h-40 rounded-full ${
            isDarkMode ? "bg-red-500/5" : "bg-red-200/20"
          } blur-xl`}
        ></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Featured Content Carousel */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 flex transition-transform duration-1000"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {featuredContent.map((content, index) => (
              <div key={index} className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <img
                  src={content.img}
                  className="object-cover w-full h-full"
                  alt=""
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-4xl px-4 lg:px-8">
                    <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
                      {/* Featured Content Info */}
                      <div className="text-white">
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 text-xs font-bold text-white border rounded-full bg-red-600/80 backdrop-blur-md border-white/20">
                            {content.category}
                          </span>
                        </div>
                        <h1 className="mb-4 text-4xl font-black lg:text-6xl">
                          {content.title}
                        </h1>
                        <p className="mb-6 text-lg leading-relaxed lg:text-xl text-slate-200">
                          {content.description}
                        </p>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-400" />
                            <span className="font-bold">{content.rating}</span>
                          </div>
                          <span className="px-3 py-1 text-sm border rounded-full bg-white/20 backdrop-blur-md border-white/30">
                            HD Quality
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <button className="flex items-center gap-3 px-8 py-4 font-black text-white transition-all bg-red-600 shadow-lg rounded-2xl hover:scale-105 shadow-red-500/30">
                            <FaPlay /> Watch Now
                          </button>
                          <button className="flex items-center gap-3 px-8 py-4 font-black text-white transition-all border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl hover:bg-white/20">
                            <FaDownload /> Download
                          </button>
                        </div>
                      </div>

                      {/* Login Form */}
                      <div
                        className={`backdrop-blur-3xl rounded-[3rem] border shadow-2xl p-8 lg:p-12 transition-all duration-700 ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-white/40 border-white/60 shadow-xl shadow-slate-200/50"
                        }`}
                      >
                        {/* Theme Toggle */}
                        <div className="flex justify-end mb-6">
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
                        </div>

                        {/* Logo and Title */}
                        <div className="mb-8 text-center">
                          <div className="flex justify-center mb-4">
                            {(() => {
                              const logoSrc = isDarkMode
                                ? "/Tese-Dark-logo.png"
                                : "/Tese-Light-Logo.png";
                              return (
                                <img
                                  src={logoSrc}
                                  alt="TESE Logo"
                                  className={`w-20 h-20`}
                                />
                              );
                            })()}
                          </div>
                          <h1 className="text-2xl font-bold text-slate-600">
                            Welcome Back
                          </h1>
                          <p className="mt-2 text-sm text-slate-500">
                            Sign in to continue watching
                          </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {error && (
                            <div className="p-3 text-sm text-red-600 border bg-red-500/10 border-red-500/20 rounded-xl">
                              {error}
                            </div>
                          )}

                          <div>
                            <label className="block mb-2 text-sm font-bold text-slate-500">
                              Email Address
                            </label>
                            <div className="relative">
                              <FaEnvelope
                                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                                  isDarkMode
                                    ? "text-white/40"
                                    : "text-slate-400"
                                }`}
                              />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full py-3 pl-12 pr-4 text-sm transition-all border rounded-xl outline-none ${
                                  isDarkMode
                                    ? "bg-white/5 border-white/10 text-white placeholder-white/30"
                                    : "bg-slate-500/10 border-slate-200 text-slate-800 placeholder-slate-400"
                                }`}
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block mb-2 text-sm font-bold text-slate-500">
                              Password
                            </label>
                            <div className="relative">
                              <FaLock
                                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                                  isDarkMode
                                    ? "text-white/40"
                                    : "text-slate-400"
                                }`}
                              />
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full py-3 pl-12 pr-12 text-sm transition-all border rounded-xl outline-none ${
                                  isDarkMode
                                    ? "bg-white/5 border-white/10 text-white placeholder-white/30"
                                    : "bg-slate-500/10 border-slate-200 text-slate-800 placeholder-slate-400"
                                }`}
                                placeholder="Enter your password"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                                  isDarkMode
                                    ? "text-white/40"
                                    : "text-slate-400"
                                }`}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-slate-500">
                              <input type="checkbox" className="mr-2" />
                              Remember me
                            </label>
                            <a
                              href="#"
                              className="text-sm text-red-600 hover:underline"
                            >
                              Forgot password?
                            </a>
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 font-bold text-white transition-all rounded-xl shadow-lg hover:scale-105 ${
                              isLoading
                                ? "bg-slate-400 cursor-not-allowed"
                                : "bg-red-600/90 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 border border-red-500/30 backdrop-blur-sm"
                            }`}
                          >
                            {isLoading ? (
                              <div className="flex items-center justify-center">
                                <div className="w-5 h-5 mr-3 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                                Signing in...
                              </div>
                            ) : (
                              "Sign In"
                            )}
                          </button>
                        </form>

                        {/* Demo Info */}
                        <div className="p-4 mt-8 text-xs border text-slate-500 bg-white/5 rounded-xl border-white/10">
                          <p className="mb-2 font-bold text-slate-400">
                            Demo Account:
                          </p>
                          <p>Email: demo@example.com</p>
                          <p>Password: demo123</p>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                          <p className="text-sm text-slate-500">
                            Don't have an account?{" "}
                            <a
                              href="#"
                              className="font-bold text-red-600 hover:underline"
                            >
                              Sign up
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Login Form */}
        <div className="w-full max-w-md lg:hidden">
          <div
            className={`backdrop-blur-3xl rounded-[3rem] border shadow-2xl p-6 transition-all duration-700 ${
              isDarkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/40 border-white/60 shadow-xl shadow-slate-200/50"
            }`}
          >
            {/* Theme Toggle */}
            <div className="flex justify-end mb-6">
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
            </div>

            {/* Logo and Title */}
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={
                    isDarkMode ? "/Tese-Dark-logo.png" : "/Tese-Light-Logo.png"
                  }
                  alt="TESE Logo"
                  className={`w-20 h-20`}
                />
              </div>
              <h1 className="text-2xl font-bold text-slate-600">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Sign in to your account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 border bg-red-500/10 border-red-500/20 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-bold text-slate-500">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      isDarkMode ? "text-white/40" : "text-slate-400"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full py-3 pl-12 pr-4 text-sm transition-all border rounded-xl outline-none ${
                      isDarkMode
                        ? "bg-white/5 border-white/10 text-white placeholder-white/30"
                        : "bg-slate-500/10 border-slate-200 text-slate-800 placeholder-slate-400"
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <FaLock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      isDarkMode ? "text-white/40" : "text-slate-400"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full py-3 pl-12 pr-12 text-sm transition-all border rounded-xl outline-none ${
                      isDarkMode
                        ? "bg-white/5 border-white/10 text-white placeholder-white/30"
                        : "bg-slate-500/10 border-slate-200 text-slate-800 placeholder-slate-400"
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                      isDarkMode ? "text-white/40" : "text-slate-400"
                    }`}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-slate-500">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-red-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 font-bold text-white transition-all rounded-xl shadow-lg hover:scale-105 ${
                  isLoading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-red-600/90 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 border border-red-500/30 backdrop-blur-sm"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 mr-3 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Demo Info */}
            <div className="p-4 mt-8 text-xs border text-slate-500 bg-white/5 rounded-xl border-white/10">
              <p className="mb-2 font-bold text-slate-400">Demo Account:</p>
              <p>Email: demo@example.com</p>
              <p>Password: demo123</p>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <a href="#" className="font-bold text-red-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
