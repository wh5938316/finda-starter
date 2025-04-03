import { defineConfig } from 'tsup';

export default defineConfig({
  clean: false,
  target: 'es2020',
  entry: {
    index: 'src/index.ts',
  },
  dts: true,
  external: [
    'class-validator',
    'class-transformer',
    '@finda-co/domain-auth-core',
    '@nestjs/microservices',
    '@nestjs/websockets',
  ],
  format: ['cjs', 'esm'],
  publicDir: 'public',
});
