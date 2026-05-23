import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        head: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        orange: {
          DEFAULT: "#ff6b2b",
          light: "#ff8c55",
          glow: "#ff6b2b22",
        },
        bg: {
          primary: "#0a0c10",
          secondary: "#0f1117",
          tertiary: "#161b24",
          card: "#1a2030",
        },
      },
    },
  },
  plugins: [],
};
export default config;
