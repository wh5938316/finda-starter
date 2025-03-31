import { defineConfig } from 'tsup';

export default defineConfig({
  clean: false,
  target: 'es2020',
  entry: ['src/index.ts'],
  dts: true,
  external: ['class-validator', 'class-transformer'],
  format: ['cjs', 'esm'],
  publicDir: 'public',
});
