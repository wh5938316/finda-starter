import { Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  // treeshake: true,
  // splitting: true,
  entry: {
    index: './src/index.tsx',
  },
  target: 'es6',
  format: ['cjs', 'esm'],
  dts: true,
  minify: true,
  clean: false,
  external: ['react', '@mui/material'],
  ...options,
}));
