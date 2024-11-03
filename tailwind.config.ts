import daisyui from "daisyui";
import { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [
    daisyui
  ]
} satisfies Config;
