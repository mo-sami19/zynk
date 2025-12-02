import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#f2ff58",
          foreground: "#0b0b0e",
          50: "#fefff0",
          100: "#fdffd6",
          200: "#fcffad",
          300: "#f9ff7f",
          400: "#f2ff58",
          500: "#e8f51e",
          600: "#d0d400",
          700: "#a3a500",
          800: "#7a7c00",
          900: "#525400",
        },
        secondary: {
          DEFAULT: "#f2ff58",
          foreground: "#0b0b0e",
          50: "#fefff0",
          100: "#fdffd6",
          200: "#fcffad",
          300: "#f9ff7f",
          400: "#f2ff58",
          500: "#f2ff58",
          600: "#e8f51e",
          700: "#d0d400",
          800: "#a3a500",
          900: "#7a7c00",
        },
        neon: {
          purple: "#a855f7",
          pink: "#ec4899",
          blue: "#3b82f6",
          violet: "#8b5cf6",
        },
        dark: {
          DEFAULT: "#0b0b0e",
          lighter: "#1a1a1f",
          card: "#15151a",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(162, 32, 240, 0.5), 0 0 40px rgba(162, 32, 240, 0.3)" 
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(162, 32, 240, 0.8), 0 0 60px rgba(162, 32, 240, 0.5)" 
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(135deg, #000000 0%, #f2ff58 50%, #212313 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
