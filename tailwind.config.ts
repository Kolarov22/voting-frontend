import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        "purple-accent": "#8685ef",
        "purple-cta": "hsla(263, 75%, 51%)",
        "frost-white": "#faf8ff",
        "contrast": "#e3e0f3"

      }
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
