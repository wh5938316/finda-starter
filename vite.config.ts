/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths({
      parseNative: false,
    }),
    react(),
  ],
  resolve: {},
  assetsInclude: ['/sb-preview/runtime.js'],
}));
