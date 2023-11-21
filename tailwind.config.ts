import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  important: true,
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e9b404",
        bgDark: "#222222",
        bgDarkSecondary: "#313131",
        textDark: "#ADADAD",
        white: "#D9D9D9",
      },
      screens: {
        xs: "430px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

export default tailwindConfig;
