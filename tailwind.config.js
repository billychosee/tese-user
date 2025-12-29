/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // Zimbabwean colors palette from lib/colors.ts
        zimbabwe: {
          red: "#DC2626",
          green: "#22C55E",
          yellow: "#EAB308",
          black: "#000000",
          white: "#FFFFFF",
          // Add opacity variants for white
          "white-20": "rgba(255, 255, 255, 0.2)",
        },
        // Light theme colors with Zimbabwe palette
        light: {
          background: "#F8FAFC",
          surface: "#FFFFFF",
          text: "#1E293B",
          muted: "#64748B",
          border: "#E2E8F0",
          card: "#FFFFFF",
          primary: "#DC2626", // Zimbabwe red
          secondary: "#22C55E", // Zimbabwe green (updated to match lib/colors.ts)
          accent: "#EAB308", // Zimbabwe yellow
        },
        // Dark theme colors with Zimbabwe palette (faded gray instead of pure black)
        dark: {
          background: "#1E293B", // Faded gray instead of pure black
          surface: "#334155", // Faded gray surface
          text: "#F8FAFC",
          muted: "#94A3B8",
          border: "#475569",
          card: "#334155",
          primary: "#DC2626", // Zimbabwe red
          secondary: "#22C55E", // Zimbabwe green (updated to match lib/colors.ts)
          accent: "#EAB308", // Zimbabwe yellow
        },
      },
    },
  },
  plugins: [],
};
