/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        vazirmatn: ['Vazirmatn', 'Roboto', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
    },
  },
  daisyui: {
    themes: [{
      light:{
        "base-content":"#121212",
        "base-100": "#ffffff",
        "base-200": "#d1d1d1",
        "base-300": "#bababa",
        "success": "#b7d93d",
        "error": "#c90010",
        "info": "#0055fe",
        "--rounded-box": "0.375rem",
        "--rounded-btn": "0.375rem",
        "--rounded-badge": "1.9rem",
        "--animation-btn": "0.25s",
        "--animation-input": "0.2s",
        "--btn-focus-scale": "1",
        "--border-btn": "1px",
        "--tab-border": "1px",
        "--tab-radius": "0.5rem"
      },
      dark:{
        "base-content":"#d1d1d1",
        "base-100": "#272727",
        "base-200": "#232323",
        "base-300": "#121212",
        "success": "#b7d93d",
        "error": "#c90010",
        "info": "#0055fe",
        "--rounded-box": "0.375rem",
        "--rounded-btn": "0.375rem",
        "--rounded-badge": "1.9rem",
        "--animation-btn": "0.25s",
        "--animation-input": "0.2s",
        "--btn-focus-scale": "1",
        "--border-btn": "1px",
        "--tab-border": "1px",
        "--tab-radius": "0.5rem"
      }
    }],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

