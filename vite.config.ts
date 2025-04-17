/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import vtjump from 'vtjump';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [
    tsconfigPaths({
      parseNative: false,
    }),
    react(),
  ];
  if (mode === 'development') {
    plugins.unshift(vtjump() as PluginOption);
  }
  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['/sb-preview/runtime.js'],
  };
});
