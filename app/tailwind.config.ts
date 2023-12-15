import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
import formPlugin from '@tailwindcss/forms'

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [aspectRatioPlugin, formPlugin],
} satisfies Config
