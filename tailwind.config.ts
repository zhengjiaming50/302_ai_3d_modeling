import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import type { PluginAPI } from "tailwindcss/types/config";

// Enhanced cyberpunk scrollbar style with glowing effects
const scrollbar = ({ addBase, theme }: PluginAPI) => {
  addBase({
    // Cyberpunk scrollbar style
    "::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: theme("colors.gray.900", "#111111"),
      borderRadius: "3px",
      width: "6px",
      boxShadow: "inset 0 0 5px rgba(0, 255, 255, 0.1)",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 255, 255, 0.6)",
      borderRadius: "3px",
      boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgba(0, 255, 255, 0.8)",
      boxShadow: "0 0 15px rgba(0, 255, 255, 0.8)",
    },
    // Dark mode cyberpunk scrollbar
    ".dark ::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    ".dark ::-webkit-scrollbar-track": {
      backgroundColor: theme("colors.gray.950", "#000000"),
      borderRadius: "3px",
      width: "6px",
      boxShadow: "inset 0 0 5px rgba(0, 255, 255, 0.2)",
    },
    ".dark ::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 255, 255, 0.7)",
      borderRadius: "3px",
      boxShadow: "0 0 10px rgba(0, 255, 255, 0.6)",
    },
    ".dark ::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgba(0, 255, 255, 1)",
      boxShadow: "0 0 20px rgba(0, 255, 255, 1)",
    },
  });
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pageBackground: "hsl(var(--page-background))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Cyberpunk specific colors
        'cyber-cyan': '#00ffff',
        'cyber-magenta': '#ff00ff',
        'cyber-yellow': '#ffff00',
        'cyber-green': '#00ff00',
        'cyber-blue': '#0080ff',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          'from': {
            'box-shadow': '0 0 5px rgba(0, 255, 255, 0.3), 0 0 10px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.1)',
          },
          'to': {
            'box-shadow': '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)',
          },
        },
        'scan': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        'mono': ['Courier New', 'Monaco', 'Menlo', 'monospace'],
        'cyber': ['Orbitron', 'monospace'],
      },
      boxShadow: {
        'cyber': '0 0 10px rgba(0, 255, 255, 0.5)',
        'cyber-lg': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
        'cyber-xl': '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5)',
      },
    },
  },
  plugins: [animate, typography, scrollbar],
};
export default config;
