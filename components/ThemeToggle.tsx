"use client";

import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { key: "light", name: "Light", icon: Sun, color: "text-yellow-500" },
    { key: "dark", name: "Dark", icon: Moon, color: "text-gray-300" },
    { key: "system", name: "System", icon: Monitor, color: "text-blue-400" },
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
        className="flex items-center px-3 py-2 text-gray-400 transition-colors rounded-lg hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle theme"
      >
        <currentTheme.icon className={`w-5 h-5 ${currentTheme.color}`} />
        <span className="ml-2 text-sm font-medium">{currentTheme.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="py-1">
            {themes.map((item) => (
              <button
                key={item.key}
                onClick={() => handleThemeSelect(item.key)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  theme === item.key
                    ? "bg-gray-100 dark:bg-gray-700 font-medium"
                    : ""
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span>{item.name}</span>
                {theme === item.key && (
                  <span className="w-2 h-2 ml-auto bg-blue-500 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
