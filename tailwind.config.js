/** @type {import("tailwindcss").Config} */
// eslint-disable-next-line no-undef
module.exports = {
  important: true,
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e9b404",
        bgDark: "#222222",
        textDark: "#ADADAD",
        white: "#D9D9D9",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
