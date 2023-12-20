await Bun.build({
  target: 'bun',
  outdir: './build',
  entrypoints: ['./src/index.ts'],
  define: {
    __dirname: import.meta.dir,
    __filename: import.meta.file,
  },
})
