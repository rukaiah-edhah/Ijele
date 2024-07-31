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
        inter:["Inter", "sans-serif"],
        work_sans: ["WorkSans", "sans-serif"],
        kite_one:["KiteOne", "sans-serif"]
      },
      colors: {
        'ijele_navy': '#153B4F',
        'ijele_teal': '#249295',
        'ijele_red': '#851316',
        'ijele_lightTeal': '#94DBB6',
        'ijele_deepGold': '#CF903F',
        'ijele_gold': '#F2BE5C',
        'ijele_cream': '#FFF6EE' //opacity set to 50% over the sidebar styling
      }
    },
  },
  plugins: [
    require("daisyui"), require("@tailwindcss/typography"),
    require('@tailwindcss/aspect-ratio')
  ],
};
export default config;

