import { cp } from "fs/promises"

await Bun.build({
  target: 'bun',
  outdir: './build',
  external: ['@prisma/client', 'bullmq', 'uglify-js'],
  entrypoints: ['./src/index.ts']
})

await cp("./src/emails", "./build/emails", { recursive: true })
