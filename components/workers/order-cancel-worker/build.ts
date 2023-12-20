await Bun.build({
  target: 'bun',
  outdir: './build',
  entrypoints: ['./src/index.ts'],
  external: ['@prisma/client', 'bullmq'],
})
