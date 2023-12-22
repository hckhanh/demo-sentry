import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig, passthroughImageService } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  image: { service: passthroughImageService() },
  integrations: [react(), tailwind({ applyBaseStyles: false })],
})
