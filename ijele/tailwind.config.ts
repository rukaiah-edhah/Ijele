import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        junge: ["Junge", "cursive"],
        work_sans: ["Work\\ Sans", "sans-serif"],
        inter:["Inter", "sans-serif"],
        kite_one:["Kite\\ One", "sans-serif"]

      }
    },
  },
  plugins: [
    require("daisyui"), require("@tailwindcss/typography"),
    require('@tailwindcss/aspect-ratio')
  ],
};
export default config;

