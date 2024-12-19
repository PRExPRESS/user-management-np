import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#9333EA',
        accent: '#10B981',
        background: {
          light: '#e8e8e8',
          dark: '#111827',
        },
        text: {
          light: '#111827',
          dark: '#E5E7EB',
        },
        border: {
          light: '#E5E7EB',
          dark: '#374151',
        },
        inputBackground: {
          light: '#F3F4F6',
          dark: '#1F2937',
        },
        buttonHover: '#2563EB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        
      },
    },
  },
  plugins: [],
} satisfies Config;
