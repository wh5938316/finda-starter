import { Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: {
    index: './src/index.ts',
    dal: './src/dal/index.ts',
  },
  splitting: false,
  sourcemap: true,
  target: 'es2015',
  format: ['cjs', 'esm'],
  dts: true,
  // minify: true,
  clean: false,
  external: [],
  ...options,
}));
