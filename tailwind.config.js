/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ?????????????????????????????????????????????????????????????
        // Khadi & Indigo � a distinctly Indian editorial palette
        // Inspired by Bengal indigo dye, marigold garlands, madder root,
        // and handspun khadi cotton. Calibrated for AA contrast on body
        // copy and AAA on headlines. Class names preserved for stability.
        // ?????????????????????????????????????????????????????????????

        // "forest" ? Midnight Indigo (primary brand)
        forest: {
          50: '#EEF0F7',
          100: '#D5D9EA',
          200: '#A8B0D2',
          300: '#7C86B6',
          400: '#525E97',
          500: '#363F76',
          600: '#262C58',
          700: '#1B2046',
          800: '#13172F',
          900: '#0A0D1E',
        },

        // "millet" ? Marigold / Saffron (warm accent)
        millet: {
          50: '#FEF6E0',
          100: '#FCE8B3',
          200: '#F9D275',
          300: '#F4B942',
          400: '#E89C2F',
          500: '#D07B1C',
          600: '#A95F13',
          700: '#83480E',
          800: '#5E330A',
          900: '#3D2106',
        },

        // "clay" ? Madder Red (warm secondary, terracotta-adjacent)
        clay: {
          50: '#FBEDE9',
          100: '#F4D0C6',
          200: '#E9A293',
          300: '#DC7660',
          400: '#C44E36',
          500: '#A53A26',
          600: '#812C1D',
          700: '#5E2014',
          800: '#40150D',
          900: '#260A06',
        },

        // "paper" ? Khadi (handspun cotton, warm off-white)
        paper: {
          DEFAULT: '#F7F1E1',
          50: '#FCF8EC',
          100: '#F7F1E1',
          200: '#EFE4CB',
          300: '#E2D2AB',
        },

        // Charcoal ink � letterpress black, slightly warm
        ink: '#0F1115',
        graphite: '#2B2E36',

        // Stone � neutrals tinted very slightly toward indigo
        stone: {
          50: '#F2F1ED',
          100: '#E5E3DC',
          200: '#CCC9BF',
          300: '#9B988C',
          400: '#6E6B60',
          500: '#52504A',
          600: '#3D3B36',
          700: '#2A2925',
        },

        // Bonus aliases � sage and brass for visual accents in cards
        sage: {
          100: '#E2E8DB',
          300: '#A8B79A',
          500: '#6C7D5C',
          700: '#42513A',
        },
        brass: {
          300: '#D9B873',
          500: '#B58E3C',
          700: '#7C5E22',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        eyebrow: '0.16em',
        tight2: '-0.02em',
        tighter2: '-0.035em',
      },
      maxWidth: {
        prose: '68ch',
        '8xl': '88rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,17,21,0.05), 0 1px 3px rgba(15,17,21,0.06)',
        card: '0 6px 22px -8px rgba(27,32,70,0.14), 0 2px 6px rgba(27,32,70,0.06)',
        ring: '0 0 0 1px rgba(27,32,70,0.10)',
      },
      backgroundImage: {
        'grain-noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
      },
    },
  },
  plugins: [],
}
