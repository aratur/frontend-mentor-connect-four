/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), checker({ typescript: true })],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'istanbul', // or 'c8'
    },
    // You can also disable type checking when running testing with Vitest
    // !process.env.VITEST ? checker({ typescript: true }) : undefined,
  },
  css: {
    postcss: {},
  },
});
