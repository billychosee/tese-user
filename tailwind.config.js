/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zimbabwean colors palette
        zimbabwe: {
          red: "#DC2626",
          green: "#16A34A",
          yellow: "#EAB308",
          black: "#000000",
          white: "#FFFFFF",
        },
        // Light theme colors
        light: {
          background: "#F8FAFC",
          surface: "#FFFFFF",
          text: "#1E293B",
          muted: "#64748B",
          border: "#E2E8F0",
          card: "#FFFFFF",
        },
        // Dark theme colors (existing)
        dark: {
          background: "#0F172A",
          surface: "#111827",
          text: "#F9FAFB",
          muted: "#9CA3AF",
          border: "#374151",
          card: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
