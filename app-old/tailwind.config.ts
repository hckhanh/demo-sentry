import type { Config } from 'tailwindcss'

import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
import formPlugin from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./app/**/*.{ts,tsx}'],
  plugins: [aspectRatioPlugin, formPlugin],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Inter fallback"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
} satisfies Config
