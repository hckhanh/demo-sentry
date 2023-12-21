import type { Config } from 'tailwindcss'

import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
import formPlugin from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  plugins: [aspectRatioPlugin, formPlugin],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Inter fallback"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
} as Config
