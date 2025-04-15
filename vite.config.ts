/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import vtjump from 'vtjump';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vtjump() as PluginOption,
    tsconfigPaths({
      parseNative: false,
    }),
    react(),
  ],
  resolve: {},
  assetsInclude: ['/sb-preview/runtime.js'],
}));
