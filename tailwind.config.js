/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f1a',
        card: '#1a1a2e',
        border: '#2a2a3e',
        primary: '#e2a626',
      },
    },
  },
  plugins: [],
};