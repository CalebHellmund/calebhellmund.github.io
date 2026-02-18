/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        accent: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: theme('colors.gray.700'),
            a: { color: theme('colors.accent.600'), '&:hover': { color: theme('colors.accent.800') } },
            'h1,h2,h3,h4': { color: theme('colors.gray.900') },
            code: { color: theme('colors.accent.700'), backgroundColor: theme('colors.accent.50'), borderRadius: '0.25rem', padding: '0.1rem 0.3rem' },
            'pre code': { color: 'inherit', backgroundColor: 'transparent', padding: 0 },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: { color: theme('colors.accent.400'), '&:hover': { color: theme('colors.accent.300') } },
            'h1,h2,h3,h4': { color: theme('colors.white') },
            code: { color: theme('colors.accent.300'), backgroundColor: theme('colors.gray.800') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};