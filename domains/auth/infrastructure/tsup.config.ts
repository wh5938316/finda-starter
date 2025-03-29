import { defineConfig } from 'tsup';

export default defineConfig({
  clean: false,
  target: 'es2020',
  entry: {
    index: 'src/index.ts',
    schema: 'src/db/schema.ts',
  },
  dts: true,
  external: ['class-validator', 'class-transformer'],
  format: ['cjs'],
  publicDir: 'public',
});
