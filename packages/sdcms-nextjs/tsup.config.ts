import { defineConfig } from 'tsup';

export default defineConfig([
  // Server-safe entry point (no SWR)
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: [
      'react',
      'react-dom',
      'next',
      'swr',
    ],
    banner: {
      js: '// @sdcms/nextjs - Server-safe exports',
    },
  },
  // Client entry point (with SWR hooks)
  {
    entry: { client: 'src/client-entry.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: false, // Don't clean since the first build already outputs to dist/
    external: [
      'react',
      'react-dom',
      'next',
      'swr',
    ],
    banner: {
      js: '"use client";\n// @sdcms/nextjs/client - Client hooks (SWR)',
    },
  },
]);
