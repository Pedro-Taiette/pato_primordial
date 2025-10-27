/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // include data and utility modules for completeness
    "./src/data/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // custom palette inspired by a neon/cyberpunk aesthetic
        'dark-base': '#0f172a',
        'dark-surface': '#1e293b',
        primary: '#22d3ee',
        'primary-light': '#67e8f9',
        'primary-lightest': '#a5f3fc',
      },
      fontFamily: {
        sans: ["Rajdhani", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.5)",
      },
      backgroundImage: {
        // radial background used on the main layout
        'radial-neon':
          'radial-gradient(at 20% 80%, rgba(34,211,238,0.15), rgba(15,23,42,0.9))',
      },
    },
  },
  plugins: [],
};