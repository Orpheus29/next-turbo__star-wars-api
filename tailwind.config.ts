import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      screens: {
        xsm: '460px',
        '3xl': '1800px',
      },
      colors: {
        'black-100': '#ccc',
        'primary-blue': {
          DEFAULT: '#2b59ff',
          100: '#f5f8ff',
        },
        'secondary-orange': '#f79761',
        'light-white': {
          DEFAULT: 'rgba(59,60,152,0.03)',
          100: 'rgba(59,60,152,0.02)',
        },
        grey: '#747A88',
      },
      backgroundImage: {
        'glow-conic':
          'conic-gradient(from 180deg at 50% 50%, #fcec03 0deg, #a853ba 180deg, #e92a67 360deg)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
