import { Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  // treeshake: true,
  // splitting: true,
  entry: {
    index: './src/index.ts',
  },
  target: 'es5',
  format: ['cjs', 'esm'],
  dts: true,
  minify: true,
  clean: false,
  external: [
    'react',
    '@mui/material',
    '@mui/x-date-pickers',
    '@mui/x-data-grid',
    '@mui/x-tree-view',
    '@finda-co/icons',
  ],
  ...options,
}));
