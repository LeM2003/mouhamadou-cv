/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8E4DD',
        accent: '#2563EB',
        background: '#F5F3EE',
        foreground: '#111111',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
