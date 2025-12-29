"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeTest() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-4 border rounded-lg bg-dark-card border-dark-border">
      <h3 className="mb-2 font-semibold text-dark-text">Theme Test</h3>
      <p className="mb-4 text-dark-muted">Current theme: {theme}</p>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 text-white transition-colors rounded-lg bg-zimbabwe-accent-bg hover:bg-zimbabwe-secondary-bg"
      >
        Toggle Theme
      </button>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-zimbabwe-accent"></div>
          <span className="text-dark-text">Zimbabwe Red</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-zimbabwe-secondary"></div>
          <span className="text-dark-text">Zimbabwe Green</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-zimbabwe-yellow"></div>
          <span className="text-dark-text">Zimbabwe Yellow</span>
        </div>
      </div>
    </div>
  );
}
