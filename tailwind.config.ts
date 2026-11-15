import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#FFF6F4",
          100: "#FFEBE5",
          200: "#FFD7CC",
          300: "#FFB5A3",
          400: "#FF876B",
          500: "#FF5B37", // Primary reference color
          600: "#F04824",
          700: "#D33513",
          800: "#A8260B",
          900: "#851F0B",
        },
        brand: {
          primary: "#FF5B37",
          dark: "#191C1F",
          light: "#F8F9FA",
          gray: "#F2F4F7",
          border: "#E5E7EB",
        },
        ivory: {
          50: "#FDFCF9",
          100: "#FAF8F5",
          200: "#F3EFEA",
          300: "#E7E0D3",
        },
        taupe: {
          50: "#F7F6F4",
          100: "#EDEBE6",
          200: "#DED9D0",
          300: "#C7BFB1",
          400: "#A89E8D",
          500: "#8A7F6E",
          600: "#6B6254",
          700: "#524A3F",
        },
        charcoal: {
          50: "#F5F6F7",
          100: "#E3E5E8",
          200: "#C5C9CE",
          500: "#5D636B",
          700: "#32373E",
          800: "#212429",
          900: "#14171A",
          950: "#0D0E10",
        },
        sage: {
          50: "#F5F7F5",
          100: "#E6ECE6",
          200: "#CFDCCF",
          400: "#8EAA92",
          500: "#697F6C",
          600: "#526555",
          700: "#3E4E41",
        },
        terracotta: {
          50: "#FCF6F5",
          100: "#F9ECE8",
          500: "#C66D57",
          600: "#B05943",
          700: "#8F422F",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Garamond", "Georgia", "serif"],
        bengali: ["var(--font-bengali)", "'Kalpurush'", "'SolaimanLipi'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
