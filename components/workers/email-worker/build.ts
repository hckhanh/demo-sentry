import { cp } from 'fs/promises'

await Bun.build({
  target: 'bun',
  outdir: './build',
  entrypoints: ['./src/index.ts'],
  external: ['@prisma/client', 'bullmq', 'uglify-js'],
})

await cp('./src/emails', './build/emails', { recursive: true })
