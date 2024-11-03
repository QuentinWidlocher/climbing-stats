import daisyui from "daisyui";
import { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'sans-serif'],
        mono: ['Noto Mono', 'mono'],
      }
    }
  },
  plugins: [
    daisyui
  ]
} satisfies Config;
