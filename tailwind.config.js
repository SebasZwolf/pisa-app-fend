const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content : [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    options : {
      safelist : [
        'bg-golden-400'
      ]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineHeight: {
        'extra-snug': '1.450'
      },
      colors : {
        golden : colors.orange,
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      orange: {
        light: '#FFAA88',
        DEFAULT: '#FF8844',
        dark: '#FF8844',
      },
      brown: {
        light: '#663300',
        DEFAULT: '#663300',
        dark: '#663300',
      }
    }
  },
  variants: {
    extend: {
      boxShadow: ['responsive', 'hover', 'focus'],
      tableLayout: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
