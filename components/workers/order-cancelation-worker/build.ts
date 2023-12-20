await Bun.build({
  target: 'bun',
  outdir: './build',
  external: ['@prisma/client', 'bullmq'],
  entrypoints: ['./src/index.ts']
})
