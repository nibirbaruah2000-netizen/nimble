/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#05070D',
          secondary: '#0B111A',
          panel: '#0F172A',
        },
        ice: {
          DEFAULT: '#7DD3FC',
          accent: '#38BDF8',
          light: '#E0F2FE',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(125,211,252,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(125,211,252,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(125, 211, 252, 0.25)',
        'glow-sm': '0 0 18px rgba(125, 211, 252, 0.18)',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333333%)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 2.4s ease-in-out infinite',
        scan: 'scan 3.2s linear infinite',
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
};
