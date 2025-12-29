"use client";

import { useState } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import { useColorClasses } from "../lib/colorUtils";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { primary, bg, border, semantic } = useColorClasses();

  const themes = [
    { key: "light", name: "Light", icon: FaSun, color: primary.yellow },
    {
      key: "dark",
      name: "Dark",
      icon: FaMoon,
      color: "text-zimbabwe-white/60",
    },
    {
      key: "system",
      name: "System",
      icon: FaDesktop,
      color: primary.red,
    },
  ];

  const currentTheme = themes.find((t) => t.key === theme) || themes[0];

  const handleThemeSelect = (selectedTheme: string) => {
    if (selectedTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      localStorage.removeItem("theme");
    } else {
      setTheme(selectedTheme as "light" | "dark");
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-2 transition-colors rounded-lg text-zimbabwe-white/60 hover:text-zimbabwe-white focus:outline-none focus:ring-2 focus:ring-zimbabwe-yellow`}
        aria-label="Toggle theme"
      >
        <currentTheme.icon className={`w-5 h-5 ${currentTheme.color}`} />
        <span className="ml-2 text-sm font-medium">{currentTheme.name}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 z-50 w-48 mt-2 origin-top-right border rounded-lg shadow-lg bg-zimbabwe-white ${border.green} dark:bg-zimbabwe-black dark:${border.green}`}
        >
          <div className="py-1">
            {themes.map((item) => (
              <button
                key={item.key}
                onClick={() => handleThemeSelect(item.key)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 hover:bg-zimbabwe-white/20 dark:hover:bg-zimbabwe-black/40 ${
                  theme === item.key
                    ? `bg-zimbabwe-white/20 dark:bg-zimbabwe-black/40 font-medium`
                    : ""
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span>{item.name}</span>
                {theme === item.key && (
                  <span
                    className={`w-2 h-2 ml-auto rounded-full ${bg.red}`}
                  ></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
