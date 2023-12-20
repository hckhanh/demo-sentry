await Bun.build({
  target: 'bun',
  outdir: './build',
  external: ['@prisma/client'],
  entrypoints: ['./src/index.ts']
})
