const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      colors: {
        lightGrey: '#f0f0f0',
        lavender: '#3C1053',
        purple: '#3C1053',
        orange: '#F56600',
        yellow: '#FFC600',
        green: '#008566',
        divider: '#F2F2F2',
        neutralBlack: '#575656',
        neutralLightGrey: '#EDEDED',
        alertRed: '#B40303',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      spacing: {
        gutter: 'var(--gutter)',
        columnGap: 'var(--columnGap)',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      fontFamily: {
        'codec-pro': ['var(--font-codec-pro)', 'sans-serif'],
        'codec-bold': ['var(--font-codec-pro-bold)', 'sans-serif'],
        'codec-extra-bold': ['var(--font-codec-extra-bold)', 'sans-serif'],
        'codec-news': ['var(--font-codec-news)', 'sans-serif'],
        'codec-fat': ['var(--font-codec-fat)', 'sans-serif'],
        'codec-heavy': ['var(--font-codec-heavy)', 'sans-serif'],
        'codec-regular': ['var(--font-codec-regular)', 'sans-serif'],
        'codec-ultra': ['var(--font-codec-ultra)', 'sans-serif'],
        'codec-light': ['var(--font-codec-light)', 'sans-serif'],
      },
      lineHeight: {
        tight: '1.2',
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      screens: {
        lg: '1024px',
        ml: '1400px',
        xl: '1900px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--font-codec-pro': 'CodecPro, sans-serif',
        },
      })
    },

    function ({ addUtilities, e, theme, variants }) {
      const weights = {
        100: 'Thin',
        200: 'ExtraLight',
        300: 'Light',
        400: 'Regular',
        500: 'Medium',
        600: 'SemiBold',
        700: 'Bolded',
        800: 'ExtraBold',
        900: 'Black',
      }
      const utilities = Object.entries(weights).map(([weight, name]) => ({
        [`.${e(`font-${name.toLowerCase()}`)}`]: {
          fontVariationSettings: `"wght" ${weight}`,
        },
      }))
      addUtilities(utilities, variants('fontWeight'))
    },
    plugin(function ({ addUtilities, theme, e }) {
      const newUtilities = {
        '.w-paragraph': {
          'font-family': 'var(--font-codec-news)',
          'font-size': '16px',
          'line-height': '24px',
        },
        '.w-h1': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '42px',
          'line-height': '42px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h2': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '38px',
          'line-height': '44px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h3': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '36px',
          'line-height': '42px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h4': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '30px',
          'line-height': '36px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h5': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '24px',
          'line-height': '32px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h6': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '21px',
          'line-height': '24px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.subtitle': {
          'font-family': 'var(--font-codec-pro-bold)',
          'font-size': '18px',
          'line-height': '28px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.title-s': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '28px',
          'line-height': '34px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
          'text-wrap': 'balance',
        },
        '.title-m': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '32px',
          'line-height': '38px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.title-l': {
          'font-family': 'var(--font-codec-ultra)',
          'font-size': '40px',
          'line-height': '44px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.title-xl': {
          'font-family': 'var(--font-codec-ultra)',
          'font-size': '46px',
          'line-height': '52px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.page-title': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '48px',
          'line-height': '94px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.subtitle-s': {
          'font-family': 'var(--font-codec-news)',
          'text-transform': 'uppercase',
          'font-size': '12px',
          'line-height': '12px',
          'letter-spacing': '1.6px',
          'text-wrap': 'balance',
        },
        '.subtitle-m': {
          'font-family': 'var(--font-codec-news)',
          'text-transform': 'uppercase',
          'font-size': '14px',
          'line-height': '14px',
          'letter-spacing': '1.6px',
          'text-wrap': 'balance',
        },
        '.subtitle-l': {
          'font-family': 'var(--font-codec-news)',
          'text-transform': 'uppercase',
          'font-size': '16px',
          'line-height': '16px',
          'letter-spacing': '1.6px',
          'text-wrap': 'balance',
        },
        '.w-paragraph-desktop': {
          'font-family': 'var(--font-codec-news)',
          'font-size': '21px',
          'line-height': '31.5px',
        },
        '.w-paragraph-s-desktop': {
          'font-family': 'var(--font-codec-news)',
          'font-size': '16px',
          'line-height': '24px',
        },
        '.w-paragraph-m-desktop': {
          'font-family': 'var(--font-codec-news)',
          'font-size': '18px',
          'line-height': '24px',
        },
        '.w-paragraph-l-desktop': {
          'font-size': '21px',
          'line-height': '31.5px',
          'font-family': 'var(--font-codec-news)',
        },
        '.w-paragraph-xl-desktop': {
          'font-size': '24px',
          'line-height': '36px',
          'font-family': 'var(--font-codec-pro)',
        },
        '.w-h1-desktop': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '90px',
          'line-height': '94px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h2-desktop': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '62px',
          'line-height': '68px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h3-desktop': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '52px',
          'line-height': '58px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h4-desktop': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '42px',
          'line-height': '50.4px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h5-desktop': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '32px',
          'line-height': '38.4px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.w-h6-desktop': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '24px',
          'line-height': '28px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.title-s-desktop': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '50px',
          'line-height': '50px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.title-m-desktop': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '62px',
          'line-height': '64px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.title-l-desktop': {
          'font-family': 'var(--font-codec-ultra)',
          'font-size': '100px',
          'line-height': '100px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.title-xl-desktop': {
          'font-family': 'var(--font-codec-ultra)',
          'font-size': '140px',
          'line-height': '140px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
        '.page-title-desktop': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '90px',
          'line-height': '92px',
          'letter-spacing': '-0.02em',
          'text-wrap': 'balance',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    require('./plugins/clamp-plugin.ts'),
  ],
}
